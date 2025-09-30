import { useState, useCallback } from 'react';
import { Question, UserAnswer, TestResult, QuizState, DivergenceComment } from '../types';
import { MANDELA_QUESTIONS, shuffleQuestions, shuffleOptions } from '../data/questions';
import { getDivergenceComment, DIVERGENCE_COMMENTS } from '../data/divergence-comments';

/**
 * 測驗狀態管理 Hook
 */
export const useQuiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    isCompleted: false,
    startTime: null,
    endTime: null
  });

  const [result, setResult] = useState<TestResult | null>(null);

  /**
   * 開始測驗
   */
  const startQuiz = useCallback(() => {
    let questions = [...MANDELA_QUESTIONS];
    
    // 隨機化題目順序
    questions = shuffleQuestions(questions);
    
    // 隨機化選項順序
    questions = questions.map(shuffleOptions);

    setQuizState({
      questions,
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false,
      startTime: new Date(),
      endTime: null
    });
    
    setResult(null);
  }, []);

  /**
   * 回答問題
   */
  const answerQuestion = useCallback((selectedOptionId: string) => {
    setQuizState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (!currentQuestion) return prev;

      const selectedOption = currentQuestion.options.find(opt => opt.id === selectedOptionId);
      if (!selectedOption) return prev;

      const newAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        selectedOptionId,
        isCorrect: selectedOption.isCorrect,
        isUnknown: selectedOption.isUnknown,
        timeSpent: 0
      };

      const newAnswers = [...prev.answers, newAnswer];

      // 最後一題不立即完成測驗，讓用戶看到答案和解釋

      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, []);

  /**
   * 下一題或完成測驗
   */
  const nextQuestion = useCallback(() => {
    setQuizState(prev => {
      // 如果當前是最後一題，完成測驗
      if (prev.currentQuestionIndex === prev.questions.length - 1) {
        const endTime = new Date();
        const totalTimeSpent = prev.startTime
          ? Math.floor((endTime.getTime() - prev.startTime.getTime()) / 1000)
          : 0;

        // 排除「不知道」的答案，只計算實際回答的題目
        const answeredQuestions = prev.answers.filter(answer => !answer.isUnknown);
        const correctAnswers = answeredQuestions.filter(answer => answer.isCorrect).length;
        const answeredCount = answeredQuestions.length;

        // 處理全選「不知道」的特殊情況
        let divergenceComment: DivergenceComment;
        if (answeredCount === 0) {
          // 全選「不知道」，使用特殊評論
          divergenceComment = DIVERGENCE_COMMENTS.find(c => c.rate === -1) || DIVERGENCE_COMMENTS[0];
        } else {
          // 正常情況 - 根據實際回答的題目計算乖離率
          divergenceComment = getDivergenceComment(correctAnswers, answeredCount);
        }

        const testResult: TestResult = {
          answers: prev.answers,
          score: correctAnswers,
          totalQuestions: prev.questions.length,
          answeredQuestions: answeredCount,
          correctAnswers,
          divergenceRate: divergenceComment.rate,
          divergenceComment: divergenceComment.comment,
          completedAt: endTime,
          totalTimeSpent
        };

        setResult(testResult);

        return {
          ...prev,
          isCompleted: true,
          endTime
        };
      }
      
      // 否則進入下一題
      if (prev.currentQuestionIndex < prev.questions.length - 1) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        };
      }
      
      return prev;
    });
  }, []);

  /**
   * 重置測驗
   */
  const resetQuiz = useCallback(() => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false,
      startTime: null,
      endTime: null
    });
    setResult(null);
  }, []);

  /**
   * 獲取當前問題
   */
  const getCurrentQuestion = useCallback((): Question | null => {
    return quizState.questions[quizState.currentQuestionIndex] || null;
  }, [quizState.questions, quizState.currentQuestionIndex]);

  /**
   * 獲取進度信息
   */
  const getProgress = useCallback(() => {
    return {
      current: quizState.currentQuestionIndex + 1,
      total: quizState.questions.length,
      percentage: quizState.questions.length > 0 
        ? Math.round(((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100)
        : 0
    };
  }, [quizState.currentQuestionIndex, quizState.questions.length]);

  /**
   * 檢查是否已回答當前問題
   */
  const isCurrentQuestionAnswered = useCallback(() => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;
    
    return quizState.answers.some(answer => answer.questionId === currentQuestion.id);
  }, [quizState.answers, getCurrentQuestion]);

  return {
    // 狀態
    quizState,
    result,
    
    // 操作
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
    
    // 輔助函數
    getCurrentQuestion,
    getProgress,
    isCurrentQuestionAnswered,
    
    // 常數 - 已移除，不再需要
  };
};
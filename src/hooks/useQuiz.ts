import { useState, useCallback } from 'react';
import { Question, UserAnswer, TestResult, QuizState, DivergenceComment } from '../types';
import { MANDELA_QUESTIONS, shuffleQuestions, shuffleOptions } from '../data/questions';
import { getDivergenceComment } from '../data/divergence-comments';

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
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    if (!currentQuestion) return;

    const selectedOption = currentQuestion.options.find(opt => opt.id === selectedOptionId);
    if (!selectedOption) return;

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId,
      isCorrect: selectedOption.isCorrect,
      timeSpent: 0 // 可以後續加入計時功能
    };

    const newAnswers = [...quizState.answers, newAnswer];

    setQuizState(prev => ({
      ...prev,
      answers: newAnswers
    }));

    // 如果是最後一題，完成測驗
    if (quizState.currentQuestionIndex === quizState.questions.length - 1) {
      completeQuiz(newAnswers);
    }
  }, [quizState]);

  /**
   * 下一題
   */
  const nextQuestion = useCallback(() => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  }, [quizState.currentQuestionIndex, quizState.questions.length]);

  /**
   * 完成測驗
   */
  const completeQuiz = useCallback((answers: UserAnswer[]) => {
    const endTime = new Date();
    const totalTimeSpent = quizState.startTime 
      ? Math.floor((endTime.getTime() - quizState.startTime.getTime()) / 1000)
      : 0;

    // 計算正確答案數和乖離率評論
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const divergenceComment: DivergenceComment = getDivergenceComment(correctAnswers, quizState.questions.length);

    const testResult: TestResult = {
      answers,
      score: correctAnswers,
      totalQuestions: quizState.questions.length,
      correctAnswers,
      divergenceRate: divergenceComment.rate,
      divergenceComment: divergenceComment.comment,
      completedAt: endTime,
      totalTimeSpent
    };

    setResult(testResult);
    setQuizState(prev => ({
      ...prev,
      isCompleted: true,
      endTime
    }));
  }, [quizState.startTime, quizState.questions.length]);

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
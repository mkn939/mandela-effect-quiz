import { UserAnswer, TestResult, Question, DivergenceComment } from '../types';
import { calculateScorePercentage } from '../data/constants';
import { getDivergenceComment, DIVERGENCE_COMMENTS } from '../data/divergence-comments';

/**
 * 計算測驗結果
 */
export const calculateTestResult = (
  answers: UserAnswer[],
  questions: Question[],
  startTime: Date,
  endTime: Date
): TestResult => {
  const totalQuestions = questions.length;
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const score = calculateScorePercentage(correctAnswers, totalQuestions);
  const divergenceComment: DivergenceComment = getDivergenceComment(correctAnswers, totalQuestions);
  const totalTimeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);

  return {
    answers,
    score,
    totalQuestions,
    correctAnswers,
    divergenceRate: divergenceComment.rate,
    divergenceComment: divergenceComment.comment,
    completedAt: endTime,
    totalTimeSpent
  };
};

/**
 * 格式化時間顯示
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}秒`;
  }
  
  return `${minutes}分${remainingSeconds}秒`;
};

/**
 * 生成分享文本
 */
export const generateShareText = (result: TestResult): string => {
  const divergenceComment = DIVERGENCE_COMMENTS.find(c => c.rate === result.divergenceRate);
  const worldLine = divergenceComment?.worldLine || '未知時空線';
  return `我的時空線乖離率為 ${result.divergenceRate}%，位於 ${worldLine}！來測試你的記憶有多少受到曼德拉效應影響吧！`;
};

/**
 * 生成分享 URL
 */
export const generateShareUrl = (platform: string, text: string, url: string): string => {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    case 'whatsapp':
      return `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
    default:
      return url;
  }
};

/**
 * 驗證答案
 */
export const validateAnswer = (question: Question, selectedOptionId: string): boolean => {
  return question.correctAnswer === selectedOptionId;
};

/**
 * 獲取問題進度百分比
 */
export const getProgressPercentage = (currentIndex: number, totalQuestions: number): number => {
  return Math.round(((currentIndex + 1) / totalQuestions) * 100);
};

/**
 * 本地存儲相關工具
 */
export const storage = {
  /**
   * 保存測驗結果到本地存儲
   */
  saveResult: (result: TestResult): void => {
    try {
      const existingResults = storage.getResults();
      const updatedResults = [...existingResults, result].slice(-10); // 只保留最近10次結果
      localStorage.setItem('mandela-quiz-results', JSON.stringify(updatedResults));
    } catch (error) {
      console.error('保存結果失敗:', error);
    }
  },

  /**
   * 獲取所有保存的測驗結果
   */
  getResults: (): TestResult[] => {
    try {
      const results = localStorage.getItem('mandela-quiz-results');
      return results ? JSON.parse(results) : [];
    } catch (error) {
      console.error('讀取結果失敗:', error);
      return [];
    }
  },

  /**
   * 清除所有保存的結果
   */
  clearResults: (): void => {
    try {
      localStorage.removeItem('mandela-quiz-results');
    } catch (error) {
      console.error('清除結果失敗:', error);
    }
  },

  /**
   * 保存測驗配置
   */
  saveConfig: (config: any): void => {
    try {
      localStorage.setItem('mandela-quiz-config', JSON.stringify(config));
    } catch (error) {
      console.error('保存配置失敗:', error);
    }
  },

  /**
   * 獲取測驗配置
   */
  getConfig: (): any => {
    try {
      const config = localStorage.getItem('mandela-quiz-config');
      return config ? JSON.parse(config) : null;
    } catch (error) {
      console.error('讀取配置失敗:', error);
      return null;
    }
  }
};

/**
 * 生成唯一 ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 深度複製對象
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

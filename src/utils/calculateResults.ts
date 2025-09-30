import { UserAnswer, TestResult } from '../types';

/**
 * 計算測驗結果，妥善處理「不知道」的回答
 */
export const calculateResults = (answers: UserAnswer[], totalQuestions: number, totalTimeSpent: number): TestResult => {
  // 分別計算不同類型的答案
  const validAnswers = answers.filter(answer => !answer.isUnknown);
  const unknownAnswers = answers.filter(answer => answer.isUnknown);
  const answeredQuestions = validAnswers.length;
  const unknownCount = unknownAnswers.length;
  
  // 計算正確答案數量
  const correctAnswers = validAnswers.filter(answer => answer.isCorrect).length;
  
  // 計算分數（基於實際回答的問題）
  const score = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;
  
  // 計算時空線乖離率
  let divergenceRate: number;
  let divergenceComment: string;
  
  if (answeredQuestions === 0) {
    // 全部選擇「不知道」的特殊情況
    divergenceRate = -1; // 特殊值，對應「謎之觀測者」評論
    divergenceComment = generateUnknownComment(unknownCount, totalQuestions);
  } else {
    // 一般情況：基於錯誤率計算
    const errorRate = (answeredQuestions - correctAnswers) / answeredQuestions;
    divergenceRate = Math.round(errorRate * 100);
    divergenceComment = generateDivergenceComment(divergenceRate, unknownCount);
  }
  
  return {
    answers,
    score: Math.round(score * 100) / 100,
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    divergenceRate,
    divergenceComment,
    completedAt: new Date(),
    totalTimeSpent
  };
};

/**
 * 生成時空線乖離率評論
 */
const generateDivergenceComment = (divergenceRate: number, unknownCount: number = 0): string => {
  const unknownNote = unknownCount > 0 ? `（其中${unknownCount}題選擇了不確定）` : '';
  
  if (divergenceRate === 0) {
    return `時空線乖離率0%！你完美地保持在α世界線上，記憶與現實完全一致。${unknownNote}`;
  } else if (divergenceRate <= 20) {
    return `時空線乖離率${divergenceRate}%。你的記憶大致與α世界線一致，只有微小的差異。${unknownNote}`;
  } else if (divergenceRate <= 40) {
    return `時空線乖離率${divergenceRate}%。你似乎經歷了一些β世界線的記憶片段。${unknownNote}`;
  } else if (divergenceRate <= 60) {
    return `時空線乖離率${divergenceRate}%。你的記憶顯示出明顯的γ世界線特徵。${unknownNote}`;
  } else if (divergenceRate <= 80) {
    return `時空線乖離率${divergenceRate}%。你來自δ世界線嗎？記憶與現實有很大差異。${unknownNote}`;
  } else {
    return `時空線乖離率${divergenceRate}%！你的記憶完全來自另一個ω世界線，與現實完全不符。${unknownNote}`;
  }
};

/**
 * 生成全選「不知道」時的特殊評論
 */
const generateUnknownComment = (unknownCount: number, totalQuestions: number): string => {
  return `謎之觀測者！你對所有${totalQuestions}個曼德拉效應都保持了謙虛的態度。雖然時空線乖離率無法測定，但這種誠實面對未知的精神，連岡倫都會為之動容。或許你就是傳說中能夠跨越多元宇宙的「中立觀測者」！`;
};

/**
 * 驗證用戶答案
 */
export const validateUserAnswer = (
  questionId: string, 
  selectedOptionId: string, 
  correctAnswerId: string, 
  isUnknown: boolean = false
): UserAnswer => {
  return {
    questionId,
    selectedOptionId,
    isCorrect: !isUnknown && selectedOptionId === correctAnswerId,
    isUnknown,
    timeSpent: 0
  };
};
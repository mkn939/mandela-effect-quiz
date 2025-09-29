import { ResultCategoryInfo, ResultCategory } from '../types';

/**
 * M1-M5 記憶分類配置
 */
export const RESULT_CATEGORIES: Record<ResultCategory, ResultCategoryInfo> = {
  M1: {
    id: 'M1',
    title: '保守記憶',
    description: '你的記憶相當準確，幾乎不受曼德拉效應影響。你可能對細節有很好的觀察力，或者對這些經典內容有深刻印象。',
    scoreRange: { min: 0, max: 1 },
    color: '#10B981', // green-500
    icon: '🎯'
  },
  M2: {
    id: 'M2',
    title: '傳統記憶',
    description: '你的記憶大部分是準確的，只有少數受到曼德拉效應影響。這是很正常的現象，顯示你的記憶基本上是可靠的。',
    scoreRange: { min: 2, max: 3 },
    color: '#3B82F6', // blue-500
    icon: '📚'
  },
  M3: {
    id: 'M3',
    title: '質疑記憶',
    description: '你處於記憶的灰色地帶，對許多"經典"內容都產生了質疑。這可能表示你開始注意到記憶的不可靠性。',
    scoreRange: { min: 4, max: 5 },
    color: '#F59E0B', // amber-500
    icon: '🤔'
  },
  M4: {
    id: 'M4',
    title: '易變記憶',
    description: '你的記憶受到曼德拉效應的顯著影響。這並不意味著你的記憶力差，而是顯示了集體記憶的複雜性。',
    scoreRange: { min: 6, max: 7 },
    color: '#EF4444', // red-500
    icon: '🌀'
  },
  M5: {
    id: 'M5',
    title: '極端效應',
    description: '你幾乎完全受到曼德拉效應影響！你可能是這個現象的"敏感者"，或者特別容易受到集體記憶變化的影響。',
    scoreRange: { min: 8, max: 10 },
    color: '#8B5CF6', // violet-500
    icon: '🔥'
  }
};

/**
 * 根據受曼德拉效應影響的題數獲取記憶分類
 */
export const getResultCategory = (affectedCount: number): ResultCategory => {
  if (affectedCount <= 1) return 'M1';
  if (affectedCount <= 3) return 'M2';
  if (affectedCount <= 5) return 'M3';
  if (affectedCount <= 7) return 'M4';
  return 'M5';
};

/**
 * 計算分數百分比
 */
export const calculateScorePercentage = (correctAnswers: number, totalQuestions: number): number => {
  return Math.round((correctAnswers / totalQuestions) * 100);
};

/**
 * 默認測驗配置
 */
export const DEFAULT_QUIZ_CONFIG = {
  totalQuestions: 10,
  randomizeQuestions: false,
  randomizeOptions: true,
  showExplanations: true,
} as const;

/**
 * 應用程式常量
 */
export const APP_CONSTANTS = {
  APP_NAME: '曼德拉效應測驗',
  APP_DESCRIPTION: '測試你對曼德拉效應的了解程度',
  GITHUB_URL: 'https://github.com/your-username/mandela-effect-quiz',
  SHARE_URL: 'https://your-username.github.io/mandela-effect-quiz',
  VERSION: '1.0.0',
} as const;

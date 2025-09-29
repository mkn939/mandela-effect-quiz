// 數據模塊導出
export * from './constants';
export * from './questions';
export * from './divergence-comments';

// 重新導出類型以便於使用
export type {
  Question,
  Option,
  UserAnswer,
  TestResult,
  DivergenceComment,
  ResultCategory,
  ResultCategoryInfo,
  QuizState,
  QuizConfig,
  AppState,
  QuizAction,
  ShareOptions,
  Statistics
} from '../types';

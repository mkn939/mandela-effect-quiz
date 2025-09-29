// 核心數據模型和類型定義

/**
 * 測驗問題介面
 */
export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * 問題選項介面
 */
export interface Option {
  id: string;
  text?: string;
  image?: string;
  isCorrect: boolean;
}

/**
 * 用戶答案介面
 */
export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpent?: number; // 答題時間（秒）
}

/**
 * 測驗結果介面
 */
export interface TestResult {
  answers: UserAnswer[];
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  divergenceRate: number; // 時空線乖離率 (0-100%)
  divergenceComment: string; // 中二風格評論
  completedAt: Date;
  totalTimeSpent: number;
}

/**
 * 時空線乖離率評論介面
 */
export interface DivergenceComment {
  rate: number; // 乖離率 (0-100)
  title: string; // 評論標題
  comment: string; // 中二評論內容
  worldLine: string; // 時空線代號 (α, β, γ等)
  color: string; // 顏色主題
}

/**
 * 測驗狀態
 */
export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: UserAnswer[];
  isCompleted: boolean;
  startTime: Date | null;
  endTime: Date | null;
}

/**
 * 測驗配置
 */
export interface QuizConfig {
  totalQuestions: number;
  timeLimit?: number; // 總時間限制（秒）
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  showExplanations: boolean;
}

/**
 * 應用程式狀態
 */
export interface AppState {
  quiz: QuizState;
  result: TestResult | null;
  config: QuizConfig;
  isLoading: boolean;
  error: string | null;
}

/**
 * 測驗操作類型
 */
export type QuizAction = 
  | { type: 'START_QUIZ'; payload: { questions: Question[]; config: QuizConfig } }
  | { type: 'ANSWER_QUESTION'; payload: UserAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'COMPLETE_QUIZ'; payload: TestResult }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

/**
 * 分享選項
 */
export interface ShareOptions {
  platform: 'facebook' | 'twitter' | 'whatsapp' | 'copy';
  title: string;
  text: string;
  url: string;
}

/**
 * 統計信息
 */
export interface Statistics {
  totalAttempts: number;
  averageScore: number;
  averageDivergenceRate: number;
  divergenceDistribution: Record<string, number>; // 乖離率區間分布
  lastAttempt: Date | null;
}

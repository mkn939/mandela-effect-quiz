import { DivergenceComment } from '../types';

/**
 * Steins;Gate 風格的時空線乖離率評論系統
 * 根據錯誤答案數計算乖離率並提供對應評論
 */
export const DIVERGENCE_COMMENTS: DivergenceComment[] = [
  {
    rate: -1, // 特殊值，用於全選「不知道」的情況
    title: '？時空線 - 謎之觀測者',
    comment: '不可思議！你對所有曼德拉效應都保持了謙虛的「不知道」態度。這種跨越認知邊界的行為，連β世界線的牧瀨紅莉栖都無法解釋。你或許就是傳說中能夠同時觀測多元宇宙的「中立觀測者」！El. Psy. Kongroo.',
    worldLine: '？ ???.??????%',
    color: '#9370DB'
  },
  {
    rate: 0,
    title: 'α時空線 - 原始記憶守護者',
    comment: '恭喜！你的記憶與現實完全同步，彷彿擁有Reading Steiner的能力。你是這個時空線的真正守護者，沒有任何曼德拉效應能夠撼動你堅實的認知基礎。El. Psy. Kongroo.',
    worldLine: 'α 1.130205%',
    color: '#00FF41'
  },
  {
    rate: 10,
    title: 'α時空線 - 近似完美',
    comment: '你的記憶幾乎完美無缺！只有極微小的時空擾動影響了你的認知。作為Lab Member，你已經具備了抵抗世界線變動的強大意志。',
    worldLine: 'α 1.130212%',
    color: '#00FF41'
  },
  {
    rate: 20,
    title: 'α時空線 - 輕微波動',
    comment: '偵測到輕微的時空線波動...你的記憶中出現了些許偏差，但仍在α時空線的穩定範圍內。這可能是某個組織的陰謀造成的時空干擾。',
    worldLine: 'α 1.130238%',
    color: '#00FF41'
  },
  {
    rate: 30,
    title: 'β時空線 - 認知分歧',
    comment: '警告！你已經進入β時空線領域。你的記憶開始與原本的現實產生明顯分歧，這可能是D-Mail實驗的副作用。需要立即進行記憶校正！',
    worldLine: 'β 2.571024%',
    color: '#FFD700'
  },
  {
    rate: 40,
    title: 'β時空線 - 記憶混亂',
    comment: '時空線乖離率持續上升！你的記憶已經受到嚴重的曼德拉效應影響。這種程度的認知偏差，連牧瀨紅莉栖都會感到困惑。',
    worldLine: 'β 2.571156%',
    color: '#FFD700'
  },
  {
    rate: 50,
    title: 'γ時空線 - 平行記憶',
    comment: '你已經跨越了認知的中點！一半的記憶來自這個時空線，一半來自平行宇宙。你正處於多重世界理論的交匯點上，宛如薛丁格的貓一般的存在。',
    worldLine: 'γ 3.444931%',
    color: '#FF8C00'
  },
  {
    rate: 60,
    title: 'γ時空線 - 時空迷途',
    comment: '危險！你的記憶已經嚴重偏離原始時空線。這種程度的乖離率，即使是未來道具研究所也難以解釋。你是否接觸了某個禁忌的時間機器？',
    worldLine: 'γ 3.445129%',
    color: '#FF8C00'
  },
  {
    rate: 70,
    title: 'δ時空線 - 記憶異端',
    comment: '極度危險的乖離率！你的認知已經與現實世界產生巨大分歧。這種狀態下，你可能已經無法區分真實與虛幻。SERN的陰謀已經深深影響了你的記憶。',
    worldLine: 'δ 4.091831%',
    color: '#FF4500'
  },
  {
    rate: 80,
    title: 'δ時空線 - 現實扭曲',
    comment: '警報！時空連續體出現嚴重扭曲！你的記憶幾乎完全來自於另一個平行宇宙。這種程度的認知偏差，連岡倫都會懷疑自己的Mad Scientist身份。',
    worldLine: 'δ 4.092391%',
    color: '#FF4500'
  },
  {
    rate: 90,
    title: 'Ω時空線 - 記憶革命',
    comment: '震撼！你已經進入了未知的Ω時空線領域！幾乎所有的記憶都與現實相反，你彷彿來自一個完全顛倒的世界。這是前所未見的曼德拉效應極限狀態！',
    worldLine: 'Ω 5.571972%',
    color: '#DC143C'
  },
  {
    rate: 100,
    title: 'Ω時空線 - 絕對倒錯',
    comment: '不可能！你達成了理論上的極限狀態！所有記憶都與現實完全相反，你就是傳說中的「反向觀測者」！這種現象連克莉絲汀娜都無法用科學解釋。你...究竟是何方神聖？',
    worldLine: 'Ω 5.572000%',
    color: '#8B0000'
  }
];

/**
 * 根據正確答案數計算乖離率並獲取對應評論
 * @param correctAnswers 正確答案數
 * @param answeredQuestions 實際回答的題數（排除「不知道」選項）
 * @returns 乖離率評論對象
 */
export const getDivergenceComment = (correctAnswers: number, answeredQuestions: number): DivergenceComment => {
  // 計算乖離率：錯誤率 × 100%
  const wrongAnswers = answeredQuestions - correctAnswers;
  const divergenceRate = answeredQuestions > 0 ? Math.round((wrongAnswers / answeredQuestions) * 100) : 0;

  // 找到最接近的乖離率評論
  let closestComment = DIVERGENCE_COMMENTS.find(c => c.rate >= 0 && c.rate === divergenceRate);
  
  // 如果找不到精確匹配，找最接近的評論
  if (!closestComment) {
    closestComment = DIVERGENCE_COMMENTS
      .filter(c => c.rate >= 0)
      .reduce((prev, curr) => 
        Math.abs(curr.rate - divergenceRate) < Math.abs(prev.rate - divergenceRate) ? curr : prev
      );
  }

  if (!closestComment) {
    // 最終備案
    closestComment = DIVERGENCE_COMMENTS.find(c => c.rate === 0) || DIVERGENCE_COMMENTS[1];
  }

  return closestComment;
};

/**
 * 獲取乖離率對應的時空線類型
 * @param divergenceRate 乖離率 (0-100)
 * @returns 時空線類型
 */
export const getWorldLineType = (divergenceRate: number): string => {
  if (divergenceRate <= 20) return 'α';
  if (divergenceRate <= 40) return 'β';
  if (divergenceRate <= 60) return 'γ';
  if (divergenceRate <= 80) return 'δ';
  return 'Ω';
};

/**
 * 獲取乖離率對應的危險等級
 * @param divergenceRate 乖離率 (0-100)
 * @returns 危險等級描述
 */
export const getDangerLevel = (divergenceRate: number): string => {
  if (divergenceRate === 0) return '完美';
  if (divergenceRate <= 20) return '安全';
  if (divergenceRate <= 40) return '注意';
  if (divergenceRate <= 60) return '警告';
  if (divergenceRate <= 80) return '危險';
  return '極限';
};
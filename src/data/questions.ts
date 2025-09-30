import { Question } from '../types';

/**
 * 曼德拉效應測驗問題集
 */
export const MANDELA_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: '皮卡丘的尾巴是甚麼樣子？',
    options: [
      {
        id: 'q1-a',
        text: '黃色尾巴',
        isCorrect: true
      },
      {
        id: 'q1-b',
        text: '黃色尾巴後面有黑色條紋',
        isCorrect: false
      },
      {
        id: 'q1-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q1-a',
    explanation: '皮卡丘的尾巴是完全黃色的，許多人錯誤記得尾端有黑色條紋，但實際上並沒有。這可能與雌性皮卡丘的心形尾巴設計混淆了。',
    category: 'animation',
    difficulty: 'medium'
  },
  {
    id: 'q2',
    text: '米老鼠的衣服是下面哪一個？',
    options: [
      {
        id: 'q2-a',
        text: '吊帶褲',
        isCorrect: false
      },
      {
        id: 'q2-b',
        text: '不是吊帶褲',
        isCorrect: true
      },
      {
        id: 'q2-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q2-b',
    explanation: '米老鼠實際上只穿紅色短褲和黃色鞋子，並沒有穿吊帶褲。許多人可能將米老鼠與其他卡通角色混淆了。',
    category: 'animation',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    text: 'Star Wars 黑武士的經典台詞是哪一個？',
    options: [
      {
        id: 'q3-a',
        text: 'Luke, I am your father',
        isCorrect: false
      },
      {
        id: 'q3-b',
        text: 'No, I am your father',
        isCorrect: true
      },
      {
        id: 'q3-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q3-b',
    explanation: '黑武士達斯·維達的實際台詞是「No, I am your father」，而不是許多人記得的「Luke, I am your father」。這是最著名的曼德拉效應之一。',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: 'q4',
    text: '白雪公主的經典台詞是哪一個？',
    options: [
      {
        id: 'q4-a',
        text: 'Mirror, Mirror on the wall',
        isCorrect: false
      },
      {
        id: 'q4-b',
        text: 'Magic mirror on the wall',
        isCorrect: true
      },
      {
        id: 'q4-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q4-b',
    explanation: '在迪士尼的白雪公主動畫中，皇后實際說的是「Magic mirror on the wall」，而不是廣為人知的「Mirror, Mirror on the wall」。',
    category: 'movies',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    text: 'Volvo 標誌有箭頭嗎？',
    options: [
      {
        id: 'q5-a',
        text: '有箭頭',
        isCorrect: true
      },
      {
        id: 'q5-b',
        text: '沒有箭頭',
        isCorrect: false
      },
      {
        id: 'q5-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q5-a',
    explanation: 'Volvo的標誌確實有一個指向右上方的箭頭，這個箭頭代表火星和男性的符號，象徵力量和鋼鐵。許多人沒有注意到這個細節。',
    category: 'brands',
    difficulty: 'medium'
  },
  {
    id: 'q6',
    text: '精武門電影中曾經說過一句經典對白是？',
    options: [
      {
        id: 'q6-a',
        text: '中國人不是東亞病夫',
        isCorrect: false
      },
      {
        id: 'q6-b',
        text: '中國人不是病夫',
        isCorrect: true
      },
      {
        id: 'q6-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q6-b',
    explanation: '在李小龍的精武門電影中，實際台詞是「中國人不是病夫」，許多人記得的「東亞病夫」版本可能是後來的引用或改編。',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: 'q7',
    text: '星際大戰C3PO的腳是什麼顏色？',
    options: [
      {
        id: 'q7-a',
        text: '全是金色',
        isCorrect: false
      },
      {
        id: 'q7-b',
        text: '有一隻銀腿',
        isCorrect: true
      },
      {
        id: 'q7-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q7-b',
    explanation: 'C-3PO機器人的右腿從膝蓋以下是銀色的，而不是全身都是金色。這個細節在電影中並不明顯，因此很多人沒有注意到。',
    category: 'movies',
    difficulty: 'hard'
  },
  {
    id: 'q8',
    text: '大富翁標誌性人物Rich Uncle Pennybags是否有戴單邊眼鏡？',
    options: [
      {
        id: 'q8-a',
        text: '有戴單邊眼鏡',
        isCorrect: false
      },
      {
        id: 'q8-b',
        text: '沒有戴單邊眼鏡',
        isCorrect: true
      },
      {
        id: 'q8-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q8-b',
    explanation: '大富翁先生（Rich Uncle Pennybags）實際上從未戴過單邊眼鏡。許多人將他與Planters花生先生的形象混淆了，後者確實戴著單邊眼鏡。',
    category: 'brands',
    difficulty: 'easy'
  },
  {
    id: 'q9',
    text: '運動品牌的正確拼寫是？',
    options: [
      {
        id: 'q9-a',
        text: 'Addidas',
        isCorrect: false
      },
      {
        id: 'q9-b',
        text: 'Adidas',
        isCorrect: true
      },
      {
        id: 'q9-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q9-b',
    explanation: '正確的拼寫是「Adidas」，只有一個「d」。許多人錯誤地認為是「Addidas」，這可能是因為發音的關係造成的誤解。',
    category: 'brands',
    difficulty: 'easy'
  },
  {
    id: 'q10',
    text: '孟子的原文是？',
    options: [
      {
        id: 'q10-a',
        text: '天將降大任于是人也',
        isCorrect: false
      },
      {
        id: 'q10-b',
        text: '天將降大任于斯人也',
        isCorrect: true
      },
      {
        id: 'q10-unknown',
        text: '不知道',
        isCorrect: false,
        isUnknown: true
      }
    ],
    correctAnswer: 'q10-b',
    explanation: '孟子的原文是「天將降大任于斯人也」，其中「斯人」是正確的用詞。許多人記得是「是人」，但這是不正確的。',
    category: 'literature',
    difficulty: 'hard'
  }
];

/**
 * 隨機打亂問題順序
 */
export const shuffleQuestions = (questions: Question[]): Question[] => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * 隨機打亂問題選項（「不知道」選項固定在最後）
 */
export const shuffleOptions = (question: Question): Question => {
  // 分離「不知道」選項和其他選項
  const unknownOption = question.options.find(opt => opt.isUnknown);
  const normalOptions = question.options.filter(opt => !opt.isUnknown);

  // 只打亂非「不知道」的選項
  const shuffledNormalOptions = [...normalOptions];
  for (let i = shuffledNormalOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledNormalOptions[i], shuffledNormalOptions[j]] = [shuffledNormalOptions[j], shuffledNormalOptions[i]];
  }

  // 將「不知道」選項放在最後
  const shuffledOptions = unknownOption
    ? [...shuffledNormalOptions, unknownOption]
    : shuffledNormalOptions;

  return {
    ...question,
    options: shuffledOptions
  };
};

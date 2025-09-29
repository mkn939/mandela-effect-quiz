import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          曼德拉效應測驗
        </h1>
        <p className="text-gray-600 leading-relaxed">
          曼德拉效應是一種現象，許多人對同一件事有著共同但錯誤的記憶。
          這個測驗將通過 10 個經典問題來測試你的記憶，並根據結果給你分配一個記憶類型。
        </p>
      </div>

      <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-800 mb-3">記憶分類系統</h2>
        <div className="text-sm text-blue-700 space-y-2">
          <div className="flex items-center justify-between">
            <span>🎯 M1 - 保守記憶</span>
            <span>0-1 題受影響</span>
          </div>
          <div className="flex items-center justify-between">
            <span>📚 M2 - 傳統記憶</span>
            <span>2-3 題受影響</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🤔 M3 - 質疑記憶</span>
            <span>4-5 題受影響</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🌀 M4 - 易變記憶</span>
            <span>6-7 題受影響</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🔥 M5 - 極端效應</span>
            <span>8-10 題受影響</span>
          </div>
        </div>
      </div>

      <div className="mb-8 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">測驗說明：</h3>
        <ul className="text-left space-y-1 max-w-md mx-auto">
          <li>• 共 10 題選擇題</li>
          <li>• 每題只能選擇一個答案</li>
          <li>• 選擇你記憶中的答案，不要查資料</li>
          <li>• 測驗結束後會顯示詳細解釋</li>
          <li>• 沒有標準答案，只有記憶分類</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 px-8 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        開始測驗
      </button>

      <p className="mt-4 text-xs text-gray-500">
        記住：相信你的第一印象，這才是最真實的記憶！
      </p>
    </div>
  );
};
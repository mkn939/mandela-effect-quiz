import React from 'react';
import { TestResult, DivergenceComment } from '../types';
import { DIVERGENCE_COMMENTS } from '../data/divergence-comments';

interface ResultDisplayProps {
  result: TestResult;
  onRestart: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  onRestart
}) => {
  const affectedCount = result.totalQuestions - result.correctAnswers;
  const accurateCount = result.correctAnswers;

  // 獲取乖離率評論資訊
  const divergenceComment = DIVERGENCE_COMMENTS.find(c => c.rate === result.divergenceRate);

  if (!divergenceComment) {
    console.error(`找不到乖離率 ${result.divergenceRate}% 的評論`);
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {divergenceComment.title}
        </h2>
        <div className="inline-flex items-center px-4 py-2 rounded-full text-white font-medium mb-4"
             style={{ backgroundColor: divergenceComment.color }}>
          乖離率：{result.divergenceRate}%
        </div>
        <div className="text-lg font-mono text-purple-600 mb-2">
          {divergenceComment.worldLine}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700 text-center leading-relaxed">
          {result.divergenceComment}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{accurateCount}</div>
          <div className="text-sm text-green-700">準確記憶</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">{affectedCount}</div>
          <div className="text-sm text-orange-700">受效應影響</div>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">關於你的記憶類型</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 總計 {result.totalQuestions} 題測試</p>
          <p>• {accurateCount} 題記憶準確</p>
          <p>• {affectedCount} 題受曼德拉效應影響</p>
          <p>• 測驗用時 {Math.floor(result.totalTimeSpent / 60)}分{result.totalTimeSpent % 60}秒</p>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={onRestart}
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          重新測驗
        </button>
        
        <button
          onClick={() => {
            const shareText = `我的時空線乖離率為 ${result.divergenceRate}%，位於 ${divergenceComment.worldLine}！${affectedCount}/${result.totalQuestions} 題記憶被曼德拉效應影響。El. Psy. Kongroo.`;
            if (navigator.share) {
              navigator.share({
                title: '曼德拉效應測驗結果',
                text: shareText,
                url: window.location.href
              });
            } else {
              navigator.clipboard.writeText(shareText + ' ' + window.location.href);
              alert('結果已複製到剪貼簿！');
            }
          }}
          className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
        >
          分享結果
        </button>
      </div>
    </div>
  );
};
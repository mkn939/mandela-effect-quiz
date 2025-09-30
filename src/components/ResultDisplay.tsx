import React from 'react';
import { TestResult } from '../types';
import { DIVERGENCE_COMMENTS } from '../data/divergence-comments';

interface ResultDisplayProps {
  result: TestResult;
  onRestart: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  onRestart
}) => {
  const unknownCount = result.totalQuestions - result.answeredQuestions;
  const affectedCount = result.answeredQuestions - result.correctAnswers;
  const accurateCount = result.correctAnswers;

  // 獲取乖離率評論資訊 - 使用 result.divergenceComment 而不是重新查找
  let divergenceComment = DIVERGENCE_COMMENTS.find(c => c.comment === result.divergenceComment);

  if (!divergenceComment) {
    console.error(`找不到評論: ${result.divergenceComment}`);
    console.error('Result object:', result);
    // 備用方案：根據乖離率找最接近的評論
    const fallbackComment = DIVERGENCE_COMMENTS
      .filter(c => c.rate >= 0)
      .reduce((prev, curr) => 
        Math.abs(curr.rate - result.divergenceRate) < Math.abs(prev.rate - result.divergenceRate) ? curr : prev
      );
    
    if (fallbackComment) {
      console.warn('使用備用評論:', fallbackComment);
      divergenceComment = fallbackComment;
    } else {
      return (
        <div className="max-w-2xl mx-auto p-6 bg-red-50 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-800 mb-4">錯誤：找不到對應的評論</h2>
          <p className="text-red-600">乖離率：{result.divergenceRate}%</p>
          <p className="text-red-600">評論：{result.divergenceComment}</p>
          <button onClick={onRestart} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            重新測驗
          </button>
        </div>
      );
    }
  }

  // 判斷是否為全選「不知道」的特殊情況
  const isAllUnknown = result.divergenceRate === -1;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {divergenceComment.title}
        </h2>
        <div className="inline-flex items-center px-4 py-2 rounded-full text-white font-medium mb-4"
             style={{ backgroundColor: divergenceComment.color }}>
          {isAllUnknown ? '乖離率：未知' : `乖離率：${result.divergenceRate}%`}
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

      <div className={`grid gap-4 mb-8 ${isAllUnknown ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {isAllUnknown ? (
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">{unknownCount}</div>
            <div className="text-sm text-purple-700">保持未知</div>
            <div className="text-xs text-purple-500 mt-1">謙虛的智慧</div>
          </div>
        ) : (
          <>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{accurateCount}</div>
              <div className="text-sm text-green-700">準確記憶</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">{affectedCount}</div>
              <div className="text-sm text-orange-700">受效應影響</div>
            </div>
            {unknownCount > 0 && (
              <div className="col-span-2">
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-600">{unknownCount}</div>
                  <div className="text-xs text-blue-700">選擇不確定</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">關於你的記憶類型</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 總計 {result.totalQuestions} 題測試</p>
          {isAllUnknown ? (
            <>
              <p>• {unknownCount} 題保持謙虛的「不知道」態度</p>
              <p>• 展現了難得的認知謙遜</p>
            </>
          ) : (
            <>
              <p>• {accurateCount} 題記憶準確</p>
              <p>• {affectedCount} 題受曼德拉效應影響</p>
              {unknownCount > 0 && <p>• {unknownCount} 題選擇不確定</p>}
            </>
          )}
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
            const shareText = isAllUnknown 
              ? `我是謎之觀測者！對所有${result.totalQuestions}個曼德拉效應都保持了謙虛態度，位於 ${divergenceComment.worldLine}！El. Psy. Kongroo.`
              : `我的時空線乖離率為 ${result.divergenceRate}%，位於 ${divergenceComment.worldLine}！${affectedCount}/${result.answeredQuestions} 題記憶被曼德拉效應影響${unknownCount > 0 ? `，${unknownCount}題保持不確定` : ''}。El. Psy. Kongroo.`;
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
import React from 'react';
import { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (optionId: string) => void;
  selectedOptionId?: string;
  showResult?: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  selectedOptionId,
  showResult = false
}) => {
  const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
  const isUnknownSelected = selectedOption?.isUnknown || false;

  return (
    <div className="max-w-3xl mx-auto p-5 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl border border-purple-100">
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
          {question.text}
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.isCorrect;

          let buttonClass = "relative p-4 border-2 rounded-xl transition-all duration-300 ease-in-out text-left transform ";

          if (showResult) {
            if (isSelected && option.isUnknown) {
              // 選擇「不知道」- 灰色中性效果
              buttonClass += "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-400 shadow-md";
            } else if (isSelected && isCorrect) {
              buttonClass += "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 shadow-lg shadow-green-200";
            } else if (isSelected && !isCorrect) {
              buttonClass += "bg-gradient-to-r from-red-50 to-rose-50 border-red-500 shadow-lg shadow-red-200";
            } else if (!isSelected && isCorrect) {
              buttonClass += "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md";
            } else {
              buttonClass += "bg-white border-gray-200 opacity-60";
            }
          } else if (isSelected) {
            buttonClass += "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-500 shadow-xl shadow-purple-200 transform scale-[1.01]";
          } else {
            buttonClass += "bg-white border-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 hover:shadow-lg hover:transform hover:scale-[1.01] cursor-pointer";
          }

          return (
            <button
              key={option.id}
              onClick={() => !showResult && onAnswer(option.id)}
              disabled={showResult}
              className={buttonClass}
            >
              <div className="flex items-center space-x-3">
                {option.image && (
                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
                    <img
                      src={option.image}
                      alt={option.text || `選項 ${option.id}`}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                )}
                {option.text && (
                  <span className="text-base md:text-lg font-medium text-gray-800 flex-1">{option.text}</span>
                )}
              </div>

              {/* 結果指示器 - 始終預留空間避免跳動 */}
              <div className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center">
                {showResult && isSelected && option.isUnknown && (
                  <div className="w-7 h-7 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {showResult && isCorrect && !option.isUnknown && (
                  <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {showResult && isSelected && !isCorrect && !option.isUnknown && (
                  <div className="w-7 h-7 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {!showResult && isSelected && (
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 解釋區塊 - 預留固定高度空間避免跳動 */}
      <div className="mt-4 h-[160px] flex items-start transition-all duration-300 ease-in-out">
        {showResult && question.explanation && (
          <div className={`w-full p-4 rounded-xl shadow-lg animate-fadeIn ${
            isUnknownSelected 
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200' 
              : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200'
          }`}>
            <div className="flex items-start space-x-2">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                isUnknownSelected 
                  ? 'bg-gradient-to-br from-blue-400 to-indigo-500' 
                  : 'bg-gradient-to-br from-amber-400 to-yellow-500'
              }`}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className={`font-bold mb-1 text-sm ${
                  isUnknownSelected ? 'text-blue-900' : 'text-amber-900'
                }`}>
                  {isUnknownSelected ? '🤔 學習時間！曼德拉效應解釋' : '💡 曼德拉效應解釋'}
                </h3>
                {isUnknownSelected && (
                  <p className="text-blue-700 text-xs mb-2 italic">
                    沒關係！讓我們一起學習這個有趣的曼德拉效應現象：
                  </p>
                )}
                <p className={`text-sm leading-relaxed ${
                  isUnknownSelected ? 'text-blue-800' : 'text-amber-800'
                }`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
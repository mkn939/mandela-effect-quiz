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
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {question.text}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.isCorrect;
          
          let buttonClass = "relative p-4 border rounded-lg transition-all duration-200 ";
          
          if (showResult) {
            if (isSelected && isCorrect) {
              buttonClass += "bg-green-100 border-green-500 border-2";
            } else if (isSelected && !isCorrect) {
              buttonClass += "bg-red-100 border-red-500 border-2";
            } else if (!isSelected && isCorrect) {
              buttonClass += "bg-green-50 border-green-300 border-2";
            } else {
              buttonClass += "bg-gray-50 border-gray-300";
            }
          } else if (isSelected) {
            buttonClass += "bg-blue-100 border-blue-500 border-2 transform scale-105";
          } else {
            buttonClass += "bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:transform hover:scale-105";
          }

          return (
            <button
              key={option.id}
              onClick={() => !showResult && onAnswer(option.id)}
              disabled={showResult}
              className={buttonClass}
            >
              <div className="flex flex-col items-center space-y-2">
                {option.image && (
                  <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                    <img 
                      src={option.image} 
                      alt={option.text || `選項 ${option.id}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                {option.text && (
                  <span className="text-sm text-center">{option.text}</span>
                )}
              </div>
              
              {/* 結果指示器 */}
              {showResult && (
                <div className="absolute top-2 right-2">
                  {isCorrect && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {isSelected && !isCorrect && (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
              
              {/* 選擇指示器 */}
              {!showResult && isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {showResult && question.explanation && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">曼德拉效應解釋</h3>
          <p className="text-yellow-700 text-sm">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
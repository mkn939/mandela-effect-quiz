import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  percentage
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">
          題目 {current} / {total}
        </span>
        <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out shadow-lg relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
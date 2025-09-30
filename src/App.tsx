import React from 'react';
import { useQuiz } from './hooks';
import { WelcomeScreen, QuizQuestion, ProgressBar, ResultDisplay } from './components';

const App: React.FC = () => {
  const {
    quizState,
    result,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
    getCurrentQuestion,
    getProgress,
    isCurrentQuestionAnswered,
    // 移除不需要的常數引用
  } = useQuiz();

  const handleAnswer = (optionId: string) => {
    answerQuestion(optionId);
  };

  // 顯示歡迎畫面
  if (quizState.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-4">
        <WelcomeScreen onStart={startQuiz} />
      </div>
    );
  }

  // 顯示測驗結果
  if (quizState.isCompleted && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-4">
        <ResultDisplay
          result={result}
          onRestart={resetQuiz}
        />
      </div>
    );
  }

  // 顯示測驗問題
  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();
  const isAnswered = isCurrentQuestionAnswered();

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-purple-700 font-medium">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex justify-center pt-8">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600">
              曼德拉效應測驗
            </span>
          </h1>
          <p className="text-center text-gray-600 text-sm mb-4">測試你的記憶是否準確</p>
          <ProgressBar {...progress} />
        </div>

        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          selectedOptionId={
            quizState.answers.find(a => a.questionId === currentQuestion.id)?.selectedOptionId
          }
          showResult={isAnswered}
        />

        {isAnswered && !quizState.isCompleted && (
          <div className="max-w-3xl mx-auto mt-4 text-center">
            <button
              onClick={nextQuestion}
              className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white text-base font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">
                {progress.current === progress.total ? '查看結果 🎯' : '下一題 →'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

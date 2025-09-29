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
    DIVERGENCE_COMMENTS
  } = useQuiz();

  const handleAnswer = (optionId: string) => {
    answerQuestion(optionId);
  };

  // 顯示歡迎畫面
  if (quizState.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <WelcomeScreen onStart={startQuiz} />
      </div>
    );
  }

  // 顯示測驗結果
  if (quizState.isCompleted && result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
            曼德拉效應測驗
          </h1>
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
          <div className="max-w-2xl mx-auto mt-6 text-center">
            <button
              onClick={nextQuestion}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              下一題
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import Timer from './Timer';
import './css/QuizPage.css';

const QuizPage = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    questions,
    userAnswers,
    saveAnswer,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    progress,
    timeRemaining,
    submitQuiz: handleTimeUp,
  } = useQuiz();

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const selectedAnswer = currentQuestion ? userAnswers[currentQuestion.id] : null;

  const handleAnswerSelect = (option) => {
    if (currentQuestion) {
      saveAnswer(currentQuestion.id, option);
    }
  };

  const handleNext = () => {
    nextQuestion();
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const handleSubmit = () => {
    const confirmSubmit = window.confirm(
      'Are you sure you want to submit your quiz? You cannot change your answers after submission.'
    );
    if (confirmSubmit) {
      submitQuiz();
    }
  };

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === 0) {
      handleTimeUp();
    }
  }, [timeRemaining]);

  if (!currentQuestion) {
    return <div className="loading">Loading question...</div>;
  }

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="progress-text">
            Question {currentQuestionIndex + 1} of {questions.length}
            <span className="answered-count"> • {answeredCount} answered</span>
          </p>
        </div>
        <Timer />
      </div>

      <div className="quiz-container">
        <div className="question-section">
          <h2 className="question-text">{currentQuestion.question}</h2>
          
          <div className="options-container">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <button
                key={key}
                className={`option-button ${selectedAnswer === key ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(key)}
              >
                <span className="option-label">{key}</span>
                <span className="option-text">{value}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="navigation-section">
          <button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
          >
            ← Previous
          </button>

          {isLastQuestion ? (
            <button
              className="nav-button submit-button"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="nav-button next-button"
              onClick={handleNext}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
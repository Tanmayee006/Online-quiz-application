import React from 'react';
import { useQuiz } from '../context/QuizContext';
import "./css/StartPage.css";

const StartPage = () => {
  const { startQuiz, loading } = useQuiz();

  const handleStart = () => {
    startQuiz(10); 
  };

  return (
    <div className="start-page">
      <div className="start-container">
        <div className="quiz-icon">📝</div>
        <h1>Welcome to the Quiz!</h1>
        <div className="quiz-info">
          <p>Test your knowledge with our interactive quiz</p>
          <ul>
            <li>10 Seconds Timer</li>
            <li>Navigate between questions</li>
            <li>See detailed results</li>
          </ul>
        </div>
        <button 
          className="start-button" 
          onClick={handleStart}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Start Quiz'}
        </button>
        <p className="instructions">
          Click "Start Quiz" when you're ready to begin
        </p>
      </div>
    </div>
  );
};

export default StartPage;
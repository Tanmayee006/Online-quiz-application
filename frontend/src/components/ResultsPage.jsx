import React from 'react';
import { useQuiz } from '../context/QuizContext';
import './css/ResultsPage.css';

const ResultsPage = () => {
  const { results, questions, userAnswers, resetQuiz } = useQuiz();

  if (!results) {
    return <div className="loading">Loading results...</div>;
  }

  const { score, correctCount, totalQuestions, results: detailedResults } = results;

  const getScoreMessage = () => {
    if (score >= 90) return { text: 'Outstanding!', emoji: '🏆' };
    if (score >= 70) return { text: 'Great Job!', emoji: '🎉' };
    if (score >= 50) return { text: 'Good Effort!', emoji: '👍' };
    return { text: 'Keep Practicing!', emoji: '💪' };
  };

  const scoreMessage = getScoreMessage();

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="score-section">
          <div className="score-emoji">{scoreMessage.emoji}</div>
          <h1>{scoreMessage.text}</h1>
          <div className="score-circle">
            <div className="score-value">{score}%</div>
          </div>
          <p className="score-summary">
            You got {correctCount} out of {totalQuestions} questions correct
          </p>
        </div>

        <div className="detailed-results">
          <h2>Question Review</h2>
          {questions.map((question, index) => {
            const result = detailedResults[question.id];
            const isCorrect = result?.isCorrect;
            const userAnswer = result?.userAnswer;
            const correctAnswer = result?.correctAnswer;

            return (
              <div 
                key={question.id} 
                className={`question-result ${isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="result-header">
                  <span className="question-number">Question {index + 1}</span>
                  <span className={`result-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                
                <p className="result-question">{question.question}</p>
                
                <div className="result-answers">
                  {Object.entries(question.options).map(([key, value]) => {
                    const isUserAnswer = userAnswer === key;
                    const isCorrectAnswer = correctAnswer === key;
                    
                    let answerClass = 'answer-option';
                    if (isCorrectAnswer) answerClass += ' correct-answer';
                    if (isUserAnswer && !isCorrect) answerClass += ' wrong-answer';

                    return (
                      <div key={key} className={answerClass}>
                        <span className="answer-label">{key}</span>
                        <span className="answer-text">{value}</span>
                        {isCorrectAnswer && <span className="answer-indicator">✓</span>}
                        {isUserAnswer && !isCorrect && <span className="answer-indicator">✗</span>}
                      </div>
                    );
                  })}
                </div>

                {!isCorrect && (
                  <div className="answer-explanation">
                    <p>
                      <strong>Your answer:</strong> {userAnswer ? `${userAnswer} - ${question.options[userAnswer]}` : 'Not answered'}
                    </p>
                    <p>
                      <strong>Correct answer:</strong> {correctAnswer} - {question.options[correctAnswer]}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="results-actions">
          <button className="retry-button" onClick={resetQuiz}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
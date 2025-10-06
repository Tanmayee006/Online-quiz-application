import React from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
const QuizApp = () => {
  const { quizStarted, quizCompleted, error } = useQuiz();

  if (error && !quizStarted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '50px 40px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ color: '#dc3545', fontSize: '32px', marginBottom: '20px' }}>⚠️ Error</h2>
          <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '50px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) return <ResultsPage />;
  if (quizStarted) return <QuizPage />;
  return <StartPage />;
};

function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}
export default App;
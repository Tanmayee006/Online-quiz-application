import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import './css/Timer.css';

const Timer = () => {
  const { timeRemaining, setTimeRemaining, timerActive } = useQuiz();

  useEffect(() => {
    if (!timerActive || timeRemaining === null) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining, setTimeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (timeRemaining <= 60) return 'timer critical';
    if (timeRemaining <= 180) return 'timer warning';
    return 'timer';
  };

  if (timeRemaining === null) return null;

  return (
    <div className={getTimerClass()}>
      <span className="timer-icon">⏱️</span>
      <span className="timer-text">{formatTime(timeRemaining)}</span>
    </div>
  );
};

export default Timer;
import React, { createContext, useContext, useState } from 'react';
import { quizApi } from '../services/api';

const QuizContext = createContext();

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  // Initialize quiz with questions
  const startQuiz = async (duration = 600) => { // Default 10 minutes
    try {
      setLoading(true);
      setError(null);
      const data = await quizApi.getQuestions();
      setQuestions(data.questions);
      setUserAnswers({});
      setCurrentQuestionIndex(0);
      setQuizStarted(true);
      setQuizCompleted(false);
      setResults(null);
      setTimeRemaining(duration);
      setTimerActive(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      setLoading(false);
    }
  };

  // Save answer for current question
  const saveAnswer = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Navigate to previous question
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Submit quiz and get results
  const submitQuiz = async () => {
    try {
      setLoading(true);
      setTimerActive(false);
      const data = await quizApi.submitAnswers(userAnswers);
      setResults(data);
      setQuizCompleted(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      setLoading(false);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizStarted(false);
    setQuizCompleted(false);
    setResults(null);
    setError(null);
    setTimeRemaining(null);
    setTimerActive(false);
  };

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Check if current question is answered
  const isCurrentQuestionAnswered = currentQuestion 
    ? userAnswers.hasOwnProperty(currentQuestion.id) 
    : false;

  // Get progress
  const progress = questions.length > 0 
    ? ((currentQuestionIndex + 1) / questions.length) * 100 
    : 0;

  const value = {
    questions,
    currentQuestionIndex,
    currentQuestion,
    userAnswers,
    quizStarted,
    quizCompleted,
    results,
    loading,
    error,
    timeRemaining,
    timerActive,
    isCurrentQuestionAnswered,
    progress,
    startQuiz,
    saveAnswer,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz,
    setTimeRemaining,
    setTimerActive,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
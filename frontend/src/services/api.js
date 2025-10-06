import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizApi = {
  // Fetch all questions
  getQuestions: async () => {
    try {
      const response = await api.get('/quiz/questions');
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },

  // Submit answers and get score
  submitAnswers: async (answers) => {
    try {
      const response = await api.post('/quiz/submit', { answers });
      return response.data;
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw error;
    }
  },
};

export default api;
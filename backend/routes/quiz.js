const express = require('express');
const router = express.Router();
const db = require('../database');

// GET all questions (without correct answers)
router.get('/questions', (req, res) => {
  const query = 'SELECT id, question_text, option_a, option_b, option_c, option_d FROM questions';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    // Transform data to frontend-friendly format
    const questions = rows.map(row => ({
      id: row.id,
      question: row.question_text,
      options: {
        A: row.option_a,
        B: row.option_b,
        C: row.option_c,
        D: row.option_d
      }
    }));
    
    res.json({ questions });
  });
});

// POST submit answers and get score
router.post('/submit', (req, res) => {
  const { answers } = req.body;
  
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Invalid answers format' });
  }
  
  const questionIds = Object.keys(answers).map(id => parseInt(id));
  
  if (questionIds.length === 0) {
    return res.status(400).json({ error: 'No answers provided' });
  }
  
  // Get correct answers from database
  const placeholders = questionIds.map(() => '?').join(',');
  const query = `SELECT id, correct_option FROM questions WHERE id IN (${placeholders})`;
  
  db.all(query, questionIds, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    // Calculate score and detailed results
    let correctCount = 0;
    const results = {};
    
    rows.forEach(row => {
      const userAnswer = answers[row.id];
      const isCorrect = userAnswer === row.correct_option;
      
      if (isCorrect) {
        correctCount++;
      }
      
      results[row.id] = {
        userAnswer: userAnswer || null,
        correctAnswer: row.correct_option,
        isCorrect
      };
    });
    
    const totalQuestions = rows.length;
    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    
    res.json({
      score,
      correctCount,
      totalQuestions,
      results
    });
  });
});

module.exports = router;
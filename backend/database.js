const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'quiz.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
const initializeDatabase = () => {
  db.serialize(() => {
    // Create questions table
    db.run(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_option TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if questions already exist
    db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
      if (err) {
        console.error('Error checking questions:', err);
        return;
      }

      // Insert sample questions if table is empty
      if (row.count === 0) {
        const sampleQuestions = [
          {
            text: 'What is the capital of France?',
            a: 'London',
            b: 'Berlin',
            c: 'Paris',
            d: 'Madrid',
            correct: 'C'
          },
          {
            text: 'Which planet is known as the Red Planet?',
            a: 'Venus',
            b: 'Mars',
            c: 'Jupiter',
            d: 'Saturn',
            correct: 'B'
          },
          {
            text: 'What is the largest ocean on Earth?',
            a: 'Atlantic Ocean',
            b: 'Indian Ocean',
            c: 'Arctic Ocean',
            d: 'Pacific Ocean',
            correct: 'D'
          },
          {
            text: 'Who painted the Mona Lisa?',
            a: 'Vincent van Gogh',
            b: 'Leonardo da Vinci',
            c: 'Pablo Picasso',
            d: 'Michelangelo',
            correct: 'B'
          },
          {
            text: 'What is the smallest prime number?',
            a: '0',
            b: '1',
            c: '2',
            d: '3',
            correct: 'C'
          },
          {
            text: 'In which year did World War II end?',
            a: '1943',
            b: '1944',
            c: '1945',
            d: '1946',
            correct: 'C'
          },
          {
            text: 'What is the chemical symbol for gold?',
            a: 'Go',
            b: 'Gd',
            c: 'Au',
            d: 'Ag',
            correct: 'C'
          },
          {
            text: 'How many continents are there?',
            a: '5',
            b: '6',
            c: '7',
            d: '8',
            correct: 'C'
          },
          {
            text: 'What is the speed of light?',
            a: '300,000 km/s',
            b: '150,000 km/s',
            c: '450,000 km/s',
            d: '600,000 km/s',
            correct: 'A'
          },
          {
            text: 'Who wrote "Romeo and Juliet"?',
            a: 'Charles Dickens',
            b: 'William Shakespeare',
            c: 'Jane Austen',
            d: 'Mark Twain',
            correct: 'B'
          }
        ];

        const insertStmt = db.prepare(`
          INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option)
          VALUES (?, ?, ?, ?, ?, ?)
        `);

        sampleQuestions.forEach(q => {
          insertStmt.run(q.text, q.a, q.b, q.c, q.d, q.correct);
        });

        insertStmt.finalize();
        console.log('Sample questions inserted successfully!');
      }
    });
  });
};

initializeDatabase();

module.exports = db;
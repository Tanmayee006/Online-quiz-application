# Quiz Application

A full-stack quiz application where users can test their knowledge through an interactive interface. Built with React on the frontend and Express + SQLite on the backend.

## What's This About?

This is a simple quiz app I built that lets you answer multiple-choice questions with a timer. You get instant feedback on your answers and can see detailed results at the end. It's pretty straightforward - pick your answers, submit, and see how you did.

## Tech Stack

**Frontend:**
- React with Vite
- Context API for state management
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js + Express
- SQLite3 database
- CORS enabled

## Getting Started

### What You'll Need

- Node.js (v14 or higher works fine)
- npm or yarn
- That's it!

### Setting Up Locally

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd quiz-application
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```
   
   The server will start on `http://localhost:5000`. The database gets created automatically with some sample questions when you first run it.

3. **Frontend Setup** (open a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

That's it! Open your browser and you should see the start screen.

## Running Tests

I've set up Jest for testing on the backend:

```bash
cd backend
npm test
```

Right now the test file is empty, but the setup is there if you want to add tests later.

## How It Works

### Starting a Quiz
- Click "Start Quiz" on the welcome screen
- Timer starts automatically (10 minutes by default)
- Navigate through questions using Next/Previous buttons

### Taking the Quiz
- Select an answer for each question (you can change your mind)
- The progress bar shows how far along you are
- Timer changes color when you're running low on time

### Results
- Submit when you're done (or timer runs out)
- See your score and which questions you got right/wrong
- Each question shows the correct answer
- Click "Try Again" to restart

## Design Decisions

**Timer Duration:** Set to 10 seconds in StartPage.jsx (line 10), but the backend supports any duration. Changed it to 10 seconds just for quick testing - you'd probably want 10 minutes for a real quiz.

**Database Choice:** Went with SQLite because it's simple and doesn't require any setup. The database file gets created automatically when you run the server.

**Navigation:** Allowed going back to previous questions so users can review/change answers. Seemed more user-friendly than forcing them forward.

**Answer Storage:** User answers are stored in memory on the frontend until submission. This way the backend doesn't need to track quiz sessions.

**Auto-Submit:** When the timer hits zero, the quiz auto-submits. Made sense to prevent users from continuing without time.

**Sample Data:** Included 10 general knowledge questions to get started. They're inserted automatically if the database is empty.

## API Endpoints

- `GET /api/quiz/questions` - Fetch all questions (without correct answers)
- `POST /api/quiz/submit` - Submit answers and get results
- `GET /api/health` - Check if server is running

## Project Structure

```
quiz-application/
├── backend/
│   ├── database.js          # Database setup and initialization
│   ├── routes/
│   │   └── quiz.js          # Quiz routes
│   ├── tests/
│   │   └── quiz.test.js     # Test file (ready for your tests)
│   ├── server.js            # Express server
│   ├── quiz.db              # SQLite database (created automatically)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   │   ├── StartPage.jsx
    │   │   ├── QuizPage.jsx
    │   │   ├── ResultsPage.jsx
    │   │   ├── Timer.jsx
    │   │   └── css/         # Component styles
    │   ├── context/         # Quiz context
    │   │   └── QuizContext.jsx
    │   ├── services/        # API calls
    │   │   └── api.js
    │   └── App.jsx
    └── package.json
```

## Things to Note

- Make sure both frontend and backend are running simultaneously
- The backend needs to be on port 5000 (frontend expects this)
- Questions are loaded when you click "Start Quiz", not on page load
- CORS is enabled for local development

## Potential Improvements

Some ideas if you want to extend this:
- Add categories/difficulty levels
- User authentication and score history
- More question types (true/false, multi-select)
- Admin panel to add/edit questions
- Leaderboard
- Better test coverage

---

Feel free to modify and improve this however you want!

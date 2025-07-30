import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AdminPage } from './components/AdminPage';
import { AnswerPage } from './components/AnswerPage';
import { PlayPage } from './components/PlayPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navigation">
          <Link to="/">Admin</Link>
          <Link to="/answer">Answer</Link>
          <Link to="/play">Play</Link>
        </nav>

        <Routes>
          <Route path="/" element={<AdminPage dataHook="admin-page" />} />
          <Route
            path="/answer"
            element={<AnswerPage dataHook="answer-page" />}
          />
          <Route path="/play" element={<PlayPage dataHook="play-page" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

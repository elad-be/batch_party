import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AdminPanel } from './components/AdminPanel';
import { AnswerInterface } from './components/AnswerInterface';
import { GamePlayView } from './components/GamePlayView';

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
          <Route path="/" element={<AdminPanel dataHook="admin-panel" />} />
          <Route
            path="/answer"
            element={<AnswerInterface dataHook="answer-interface" />}
          />
          <Route
            path="/play"
            element={<GamePlayView dataHook="game-play-view" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

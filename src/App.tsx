import * as React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AdminPage } from './components/AdminPage';
import { AnswerPage } from './components/AnswerPage';
import { PlayPage } from './components/PlayPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
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

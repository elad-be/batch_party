import React from 'react';
import './ScorePanel.css';

interface ScorePanelProps {
  matchCount: number;
  onMarkMatch: (correct: boolean) => void;
  dataHook?: string;
}

export const ScorePanel: React.FC<ScorePanelProps> = ({
  matchCount,
  onMarkMatch,
  dataHook = 'score-panel',
}) => {
  return (
    <div className="judge-panel-wrapper" data-hook={dataHook}>
      <div className="match-counter">✔ Matches: {matchCount}</div>
      <div className="judge-panel">
        <button className="correct" onClick={() => onMarkMatch(true)}>
          ✔
        </button>
        <button className="wrong" onClick={() => onMarkMatch(false)}>
          ✖
        </button>
      </div>
    </div>
  );
};

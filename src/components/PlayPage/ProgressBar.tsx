import React from 'react';

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  dataHook?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  dataHook = 'progress-bar',
}) => {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="progress-bar-container" data-hook={dataHook}>
      <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
    </div>
  );
};

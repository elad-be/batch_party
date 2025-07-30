import React from 'react';

interface QuestionNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  dataHook?: string;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  onPrevious,
  onNext,
  dataHook = 'question-navigation',
}) => {
  return (
    <div className="nav-buttons" data-hook={dataHook}>
      <button onClick={onPrevious}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

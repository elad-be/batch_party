import React from 'react';

interface QuestionNavigationProps {
  onPrevious: () => void;
  onSubmit: () => void;
  dataHook?: string;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  onPrevious,
  onSubmit,
  dataHook = 'question-navigation',
}) => {
  return (
    <div className="nav-buttons" data-hook={dataHook}>
      <button onClick={onPrevious}>Back</button>
      <button onClick={onSubmit}>Next</button>
    </div>
  );
};

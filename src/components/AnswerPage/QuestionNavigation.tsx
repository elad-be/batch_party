import React from 'react';

interface QuestionNavigationProps {
  onPrevious: () => void;
  onSubmit: () => void;
  isNextDisabled?: boolean;
  dataHook?: string;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  onPrevious,
  onSubmit,
  isNextDisabled = false,
  dataHook = 'question-navigation',
}) => {
  return (
    <div className="nav-buttons" data-hook={dataHook}>
      <button onClick={onPrevious}>Back</button>
      <button 
        onClick={onSubmit} 
        disabled={isNextDisabled}
        data-hook="next-button"
      >
        Next
      </button>
    </div>
  );
};

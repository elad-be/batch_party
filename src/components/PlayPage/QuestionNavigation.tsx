import React from 'react';
import { useQuestions } from '../../hooks/useQuestions';

interface QuestionNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  dataHook?: string;
  currentIndex: number;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  onPrevious,
  onNext,
  dataHook = 'question-navigation',
  currentIndex,
}) => {
  const { questions } = useQuestions('answered');

  const hasNext = currentIndex < questions.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="nav-buttons" data-hook={dataHook}>
      <button onClick={onPrevious} disabled={!hasPrevious}>
        Back
      </button>
      <button onClick={onNext} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};

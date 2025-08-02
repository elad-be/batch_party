import React from 'react';
import { Question } from '../../types';

interface QuestionDisplayProps {
  question: Question;
  dataHook?: string;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  dataHook = 'question-display',
}) => {
  return (
    <div className="question-box" data-hook={dataHook}>
      <p className="current-question">{question.question}</p>
    </div>
  );
};

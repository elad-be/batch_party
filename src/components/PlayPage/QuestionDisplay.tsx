import React from 'react';
import { Question } from '../../types';
import { AnswerDisplay } from './AnswerDisplay';
import { CountdownTimer } from './CountdownTimer';

interface QuestionDisplayProps {
  question: Question;
  answerVisible: boolean;
  onToggleAnswer: () => void;
  onCountdownComplete: () => void;
  dataHook?: string;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  answerVisible,
  onToggleAnswer,
  onCountdownComplete,
  dataHook = 'question-display',
}) => {
  return (
    <div className="question-display" data-hook={dataHook}>
      <p className="question-text">{question.question}</p>

      <CountdownTimer
        onCountdownComplete={onCountdownComplete}
        dataHook="countdown-timer"
      />

      <button onClick={onToggleAnswer}>
        {answerVisible ? 'Hide Answer' : 'Show Answer'}
      </button>

      {answerVisible && (
        <AnswerDisplay question={question} dataHook="answer-display" />
      )}
    </div>
  );
};

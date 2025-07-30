import React from 'react';
import { Question } from '../../types';

interface AnswerDisplayProps {
  question: Question;
  dataHook?: string;
}

export const AnswerDisplay: React.FC<AnswerDisplayProps> = ({
  question,
  dataHook = 'answer-display',
}) => {
  return (
    <div data-hook={dataHook}>
      {question.answered_audio_path ? (
        <audio controls src={`/${question.answered_audio_path}`} />
      ) : (
        <p className="answer-text">{question.answered_text}</p>
      )}
    </div>
  );
};

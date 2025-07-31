import { useState } from 'react';
import { Question } from '../../types';
import { AnswerDisplay } from './AnswerDisplay';

interface QuestionDisplayProps {
  question: Question;
  dataHook?: string;
}

export const QuestionDisplay = ({
  question,
  dataHook = 'question-display',
}: QuestionDisplayProps) => {
  const [answerVisible, setAnswerVisible] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const startCountdown = (onCountdownComplete?: () => void) => {
    setCountdown(3);
    setTimeout(() => setCountdown(2), 800);
    setTimeout(() => setCountdown(1), 1600);
    setTimeout(() => {
      setCountdown(null);
      onCountdownComplete?.();
    }, 2400);
  };


  const handleButtonClick = () => {
    if(!answerVisible) {
      startCountdown(() => setAnswerVisible(true));
    } else {
      setAnswerVisible(false);
    }
  }

  return (
    <div className="question-display" data-hook={dataHook}>
      <p className="question-text">{question.question}</p>
      <button
        onClick={handleButtonClick}
        disabled={!!countdown}
      >
        {answerVisible ? 'Hide Answer'  : 'Show Answer'}
      </button>

      {!answerVisible && !!countdown && (
        <div className="countdown">{countdown}</div>
      )}

      {answerVisible && (
        <AnswerDisplay question={question} dataHook="answer-display" />
      )}
    </div>
  );
};

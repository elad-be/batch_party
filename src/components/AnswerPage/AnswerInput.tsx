import React from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  dataHook?: string;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  onChange,
  dataHook = 'answer-input',
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      placeholder="Type your answer here..."
      data-hook={dataHook}
      className="answer-input"
    />
  );
};

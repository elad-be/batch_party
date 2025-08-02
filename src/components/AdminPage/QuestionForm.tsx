import React, { useState } from 'react';

interface QuestionFormProps {
  onSubmit: (questions: string[]) => Promise<void>;
  dataHook?: string;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  onSubmit,
  dataHook = 'question-form',
}) => {
  const [questionInput, setQuestionInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = questionInput.trim();
    if (!rawInput) return;

    const questions = rawInput
      .split('\n')
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    await onSubmit(questions);
    setQuestionInput('');
  };

  return (
    <form onSubmit={handleSubmit} data-hook={dataHook}>
      <textarea
        value={questionInput}
        onChange={(e) => setQuestionInput(e.target.value)}
        placeholder="Enter questions here… Each line will be added as a separate question. Use Shift+Enter for newlines."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

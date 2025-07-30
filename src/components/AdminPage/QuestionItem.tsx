import React from 'react';
import { Question } from '../../types';

interface QuestionItemProps {
  question: Question;
  editingId: number | null;
  editText: string;
  onEditTextChange: (text: string) => void;
  onEdit: (id: number, currentText: string, wasAnswered: boolean) => void;
  onDelete: (id: number) => void;
  dataHook?: string;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  editingId,
  editText,
  onEditTextChange,
  onEdit,
  onDelete,
  dataHook = 'question-item',
}) => {
  const isEditing = editingId === question.id;

  return (
    <li className="question-item" data-hook={dataHook}>
      <div className="question-text">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => onEditTextChange(e.target.value)}
            />
            <button
              onClick={() =>
                onEdit(question.id, question.question, question.answered)
              }
            >
              Save
            </button>
          </>
        ) : (
          <>
            <b>Q:</b> {question.question} <br />
            <b>Status:</b>{' '}
            {question.answered ? '✅ Answered' : '❌ Not answered'}
          </>
        )}
      </div>
      <div className="actions">
        <button
          onClick={() =>
            onEdit(question.id, question.question, question.answered)
          }
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <button onClick={() => onDelete(question.id)}>Delete</button>
      </div>
    </li>
  );
};

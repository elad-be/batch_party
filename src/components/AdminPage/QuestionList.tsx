import React from 'react';
import { Question } from '../../types';
import { QuestionItem } from './QuestionItem';
import './QuestionList.css';

interface QuestionListProps {
  questions: Question[];
  editingId: number | null;
  editText: string;
  onEditTextChange: (text: string) => void;
  onEdit: (id: number, currentText: string, wasAnswered: boolean) => void;
  onDelete: (id: number) => void;
  dataHook?: string;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  editingId,
  editText,
  onEditTextChange,
  onEdit,
  onDelete,
  dataHook = 'question-list',
}) => {
  return (
    <div className="question-wrapper" data-hook={dataHook}>
      <ul className="question-list">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            editingId={editingId}
            editText={editText}
            onEditTextChange={onEditTextChange}
            onEdit={onEdit}
            onDelete={onDelete}
            dataHook={`question-item-${question.id}`}
          />
        ))}
      </ul>
    </div>
  );
};

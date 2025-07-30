import React, { useState } from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import { api } from '../../services/api';
import { FilterButtons } from './FilterButtons';
import { NavigationButtons } from './NavigationButtons';
import { QuestionForm } from './QuestionForm';
import { QuestionList } from './QuestionList';

type FilterType = 'all' | 'answered' | 'unanswered';

interface AdminPageProps {
  dataHook?: string;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  dataHook = 'admin-page',
}) => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const { questions, refetch } = useQuestions(currentFilter);

  const handleAddQuestions = async (questions: string[]) => {
    for (const question of questions) {
      await api.addQuestion(question);
    }
    refetch();
  };

  const handleDelete = async (id: number) => {
    await api.deleteQuestion(id);
    refetch();
  };

  const handleEdit = async (
    id: number,
    currentText: string,
    wasAnswered: boolean,
  ) => {
    if (editingId === id) {
      const newText = editText.trim();
      if (newText) {
        let confirmReset = false;
        if (wasAnswered && newText !== currentText) {
          confirmReset = confirm(
            'This question was already answered. Do you want to mark it as unanswered?',
          );
        }

        await api.editQuestion(id, newText, confirmReset);
        setEditingId(null);
        setEditText('');
        refetch();
      }
    } else {
      setEditingId(id);
      setEditText(currentText);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    if (currentFilter === 'answered') return q.answered;
    if (currentFilter === 'unanswered') return !q.answered;
    return true;
  });

  return (
    <div className="container" data-hook={dataHook}>
      <h1>Bachelorette Question Game: Admin</h1>

      <QuestionForm onSubmit={handleAddQuestions} dataHook="question-form" />

      <h2>Questions</h2>

      <FilterButtons
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        dataHook="filter-buttons"
      />

      <QuestionList
        questions={filteredQuestions}
        editingId={editingId}
        editText={editText}
        onEditTextChange={setEditText}
        onEdit={handleEdit}
        onDelete={handleDelete}
        dataHook="question-list"
      />

      <NavigationButtons dataHook="navigation-buttons" />
    </div>
  );
};

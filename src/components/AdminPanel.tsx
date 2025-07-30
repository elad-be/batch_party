import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuestions } from '../hooks/useQuestions';
import { api } from '../services/api';

interface AdminPanelProps {
  dataHook?: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  dataHook = 'admin-panel',
}) => {
  const [questionInput, setQuestionInput] = useState('');
  const [currentFilter, setCurrentFilter] = useState<
    'all' | 'answered' | 'unanswered'
  >('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const { questions, refetch } = useQuestions(currentFilter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = questionInput.trim();
    if (!rawInput) return;

    const questions = rawInput
      .split('\n')
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    for (const question of questions) {
      await api.addQuestion(question);
    }

    setQuestionInput('');
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

      <form onSubmit={handleSubmit}>
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

      <h2>Questions</h2>
      <div className="filter-buttons">
        <button
          className={currentFilter === 'all' ? 'active' : ''}
          onClick={() => setCurrentFilter('all')}
        >
          All
        </button>
        <button
          className={currentFilter === 'answered' ? 'active' : ''}
          onClick={() => setCurrentFilter('answered')}
        >
          Answered
        </button>
        <button
          className={currentFilter === 'unanswered' ? 'active' : ''}
          onClick={() => setCurrentFilter('unanswered')}
        >
          Not Answered
        </button>
      </div>

      <div className="question-wrapper">
        <ul className="question-list">
          {filteredQuestions.map((q) => (
            <li key={q.id} className="question-item">
              <div className="question-text">
                {editingId === q.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      onClick={() => handleEdit(q.id, q.question, q.answered)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>Q:</span> {q.question} <br />
                    <span>Status:</span>{' '}
                    {q.answered ? '✅ Answered' : '❌ Not answered'}
                  </>
                )}
              </div>
              <div className="actions">
                <button
                  onClick={() => handleEdit(q.id, q.question, q.answered)}
                >
                  {editingId === q.id ? 'Cancel' : 'Edit'}
                </button>
                <button onClick={() => handleDelete(q.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-buttons">
        <Link to="/answer" className="nav-button">
          Go to Answer Page
        </Link>
        <Link to="/play" className="nav-button">
          Go to Play Page
        </Link>
      </div>
    </div>
  );
};

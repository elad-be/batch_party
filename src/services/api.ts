import { ApiResponse, Question } from '../types';

const API_BASE = 'http://localhost:5001';

export const api = {
  async getQuestions(): Promise<Question[]> {
    const response = await fetch(`${API_BASE}/get_questions`);
    const data: ApiResponse = await response.json();
    return data.questions;
  },

  async getUnansweredQuestions(): Promise<Question[]> {
    const response = await fetch(`${API_BASE}/get_unanswered_questions`);
    const data: ApiResponse = await response.json();
    return data.questions;
  },

  async getAnsweredQuestions(): Promise<Question[]> {
    const response = await fetch(`${API_BASE}/get_answered_questions`);
    const data: ApiResponse = await response.json();
    return data.questions;
  },

  async addQuestion(question: string): Promise<void> {
    await fetch(`${API_BASE}/add_question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
  },

  async deleteQuestion(id: number): Promise<void> {
    await fetch(`${API_BASE}/delete_question/${id}`, {
      method: 'DELETE',
    });
  },

  async editQuestion(
    id: number,
    question: string,
    resetAnswer: boolean = false,
  ): Promise<void> {
    await fetch(`${API_BASE}/edit_question/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, reset_answer: resetAnswer }),
    });
  },

  async answerQuestion(id: number, answer: string): Promise<void> {
    await fetch(`${API_BASE}/answer_question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, answer }),
    });
  },

  async uploadAudio(id: number, audioBlob: Blob): Promise<void> {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('id', id.toString());

    await fetch(`${API_BASE}/upload_audio`, {
      method: 'POST',
      body: formData,
    });
  },
};

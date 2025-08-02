import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Question } from '../types';

export const useQuestions = (
  type: 'all' | 'answered' | 'unanswered' = 'all',
) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      let data: Question[];
      switch (type) {
        case 'answered':
          data = await api.getAnsweredQuestions();
          break;
        case 'unanswered':
          data = await api.getUnansweredQuestions();
          break;
        default:
          data = await api.getQuestions();
      }
      setQuestions(data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    const interval = setInterval(fetchQuestions, 3000);
    return () => clearInterval(interval);
  }, [type]);

  return { questions, isLoading, refetch: fetchQuestions };
};

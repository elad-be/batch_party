import React, { useEffect, useState } from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import { api } from '../../services/api';
import { AnswerInput } from './AnswerInput';
import { AudioRecorder } from './AudioRecorder';
import { NoQuestionsMessage } from './NoQuestionsMessage';
import { PageNavigation } from './PageNavigation';
import { QuestionDisplay } from './QuestionDisplay';
import { QuestionNavigation } from './QuestionNavigation';

interface AnswerPageProps {
  dataHook?: string;
}

export const AnswerPage: React.FC<AnswerPageProps> = ({
  dataHook = 'answer-page',
}) => {
  const { questions } = useQuestions('unanswered');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const currentQuestion = questions[currentIndex];

  const showQuestion = () => {
    setAnswerText('');
    setAudioChunks([]);
  };

  useEffect(() => {
    showQuestion();
  }, [currentIndex, questions]);

  const submitAnswer = async () => {
    if (!currentQuestion) return;

    if (audioChunks.length > 0) {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      await api.uploadAudio(currentQuestion.id, blob);
      setAudioChunks([]);
    } else if (answerText.trim()) {
      await api.answerQuestion(currentQuestion.id, answerText);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRecordingComplete = (chunks: Blob[]) => {
    setAudioChunks(chunks);
  };

  if (!currentQuestion) {
    return <NoQuestionsMessage dataHook="no-questions-message" />;
  }

  return (
    <div className="container" data-hook={dataHook}>
      <h1>Answer the Questions</h1>

      <QuestionDisplay question={currentQuestion} dataHook="question-display" />

      <AnswerInput
        value={answerText}
        onChange={setAnswerText}
        dataHook="answer-input"
      />

      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        dataHook="audio-recorder"
      />

      <QuestionNavigation
        onPrevious={prevQuestion}
        onSubmit={submitAnswer}
        dataHook="question-navigation"
      />

      <PageNavigation dataHook="page-navigation" />
    </div>
  );
};

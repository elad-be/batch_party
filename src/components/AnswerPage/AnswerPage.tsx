import { useEffect, useRef, useState } from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import { api } from '../../services/api';
import { AnswerInput } from './AnswerInput';
import './AnswerPage.css';
import { AudioRecorder } from './AudioRecorder';
import { NoQuestionsMessage } from './NoQuestionsMessage';
import { ProgressBar } from './ProgressBar';
import { QuestionDisplay } from './QuestionDisplay';
import { QuestionNavigation } from './QuestionNavigation';

interface AnswerPageProps {
  dataHook?: string;
}

export const AnswerPage = ({ dataHook = 'answer-page' }: AnswerPageProps) => {
  const { questions } = useQuestions('unanswered');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const audioBlobRef = useRef<Blob | null>(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    setAnswerText('');
    setAudioChunks([]);
  }, [currentIndex]);

  // Ensure currentIndex is always in bounds after questions update
  useEffect(() => {
    if (questions.length > 0 && currentIndex >= questions.length) {
      setCurrentIndex(questions.length - 1);
    }
  }, [questions.length, currentIndex]);

  const submitAnswer = async () => {
    if (!currentQuestion) return;

    // Save both text and audio if present
    if (answerText.trim()) {
      await api.answerQuestion(currentQuestion.id, answerText);
      setAnswerText('');
    }
    if (audioBlobRef.current) {
      await api.uploadAudio(currentQuestion.id, audioBlobRef.current);
      audioBlobRef.current = null;
      setAudioChunks([]);
    } else if (audioChunks.length > 0) {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      await api.uploadAudio(currentQuestion.id, blob);
      setAudioChunks([]);
    }

    setCurrentIndex(0);
  };
  // Skip button handler
  const skipQuestion = () => {
    setCurrentIndex((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRecordingComplete = (chunks: Blob[]) => {
    setAudioChunks(chunks);
    audioBlobRef.current = new Blob(chunks, { type: 'audio/webm' });
  };

  // Check if user has provided any answer (text or audio)
  const hasAnswer =
    answerText.trim().length > 0 ||
    audioChunks.length > 0 ||
    audioBlobRef.current !== null;

  if (!currentQuestion) {
    return <NoQuestionsMessage dataHook="no-questions-message" />;
  }

  return (
    <div className="container" data-hook={dataHook}>
      <h1>Answer the Questions</h1>

      <ProgressBar
        current={currentIndex}
        total={questions.length}
        dataHook="question-progress"
      />

      <QuestionDisplay question={currentQuestion} dataHook="question-display" />

      <AnswerInput
        value={answerText}
        onChange={setAnswerText}
        dataHook="answer-input"
      />

      <div className="audio-recorder">
        <AudioRecorder
          onRecordingComplete={handleRecordingComplete}
          dataHook="audio-recorder"
          resetKey={currentQuestion?.id ?? currentIndex}
        />
      </div>

      <div className="button-section">
        <div className="primary-actions">
          <QuestionNavigation
            onPrevious={prevQuestion}
            onSubmit={submitAnswer}
            isNextDisabled={!hasAnswer}
            dataHook="question-navigation"
          />
        </div>
        <div className="secondary-actions">
          <button
            onClick={skipQuestion}
            className="skip-button"
            data-hook="skip-button"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

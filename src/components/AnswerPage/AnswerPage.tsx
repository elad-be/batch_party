import { useEffect, useState, useRef } from 'react';
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

export const AnswerPage = ({
  dataHook = 'answer-page',
}: AnswerPageProps) => {
  const { questions } = useQuestions('unanswered');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const audioBlobRef = useRef<Blob | null>(null);

  const currentQuestion = questions[currentIndex];

  const showQuestion = () => {
    setAnswerText('');
    setAudioChunks([]);
  };

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
        resetKey={currentQuestion?.id ?? currentIndex}
      />

      <QuestionNavigation
        onPrevious={prevQuestion}
        onSubmit={submitAnswer}
        dataHook="question-navigation"
      />
      <button onClick={skipQuestion} style={{ marginTop: 16 }}>Skip</button>


    </div>
  );
};

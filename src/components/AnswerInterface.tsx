import React, { useEffect, useRef, useState } from 'react';
import { useQuestions } from '../hooks/useQuestions';
import { api } from '../services/api';

interface AnswerInterfaceProps {
  dataHook?: string;
}

export const AnswerInterface: React.FC<AnswerInterfaceProps> = ({
  dataHook = 'answer-interface',
}) => {
  const { questions } = useQuestions('unanswered');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordStatus, setRecordStatus] = useState('');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const currentQuestion = questions[currentIndex];

  const showQuestion = () => {
    setAnswerText('');
    setRecordStatus('');
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

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          setAudioChunks(chunks);
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordStatus('Recording...');
      } catch (error) {
        console.error('Failed to start recording:', error);
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setRecordStatus('Recording saved. Ready to submit.');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="container" data-hook={dataHook}>
        <h1>Answer the Questions</h1>
        <p>No more questions.</p>
      </div>
    );
  }

  return (
    <div className="container" data-hook={dataHook}>
      <h1>Answer the Questions</h1>

      <div className="question-box">
        <p className="current-question">{currentQuestion.question}</p>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          rows={4}
          placeholder="Type your answer here..."
        />

        <div className="recording-section">
          <button onClick={toggleRecording}>
            {isRecording ? '⏹️ Stop Recording' : '🎙️ Start Recording'}
          </button>
          <p className="record-status">{recordStatus}</p>
        </div>
      </div>

      <div className="nav-buttons">
        <button onClick={prevQuestion}>Back</button>
        <button onClick={submitAnswer}>Next</button>
      </div>
    </div>
  );
};

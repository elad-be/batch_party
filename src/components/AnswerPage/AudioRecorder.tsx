import React, { useRef, useState } from 'react';

interface AudioRecorderProps {
  onRecordingComplete: (audioChunks: Blob[]) => void;
  dataHook?: string;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  dataHook = 'audio-recorder',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordStatus, setRecordStatus] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

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
          onRecordingComplete(chunks);
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

  return (
    <div className="recording-section" data-hook={dataHook}>
      <button onClick={toggleRecording}>
        {isRecording ? '⏹️ Stop Recording' : '🎙️ Start Recording'}
      </button>
      <p className="record-status">{recordStatus}</p>
    </div>
  );
};

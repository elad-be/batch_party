import { useRef, useState, useEffect } from 'react';

interface AudioRecorderProps {
  onRecordingComplete: (chunks: Blob[]) => void;
  dataHook?: string;
  resetKey?: string | number;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  dataHook = 'audio-recorder',
  resetKey,
}) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]); // <-- use ref for chunks

  const startRecording = async () => {
    setAudioURL(null);
    chunksRef.current = [];
    setRecording(true);
    setTimer(0);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      setAudioURL(URL.createObjectURL(blob));
      onRecordingComplete(chunksRef.current);
      setRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    recorder.start();

    timerRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reRecord = () => {
    setAudioURL(null);
    chunksRef.current = [];
    setTimer(0);
  };

  // Reset UI when a new question is loaded (when audioURL should be cleared)
  useEffect(() => {
    setAudioURL(null);
    setTimer(0);
    chunksRef.current = [];
    setRecording(false);
    setMediaRecorder(null);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [resetKey]);

  return (
    <div data-hook={dataHook}>
      {!recording && !audioURL && (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {recording && (
        <div>
          <span>Recording... {timer}s</span>
          <button onClick={stopRecording}>Stop</button>
        </div>
      )}
      {audioURL && !recording && (
        <div>
          <audio controls src={audioURL} />
          <button onClick={reRecord}>Re-record</button>
        </div>
      )}
    </div>
  );
};

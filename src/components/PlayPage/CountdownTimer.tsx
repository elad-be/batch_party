import React, { useState } from 'react';

interface CountdownTimerProps {
  onCountdownComplete: () => void;
  dataHook?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  onCountdownComplete,
  dataHook = 'countdown-timer',
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  const startCountdown = () => {
    setCountdown(3);
    setTimeout(() => setCountdown(2), 800);
    setTimeout(() => setCountdown(1), 1600);
    setTimeout(() => {
      setCountdown(null);
      onCountdownComplete();
    }, 2400);
  };

  return (
    <div data-hook={dataHook}>
      {countdown && <div className="countdown">{countdown}</div>}
      <button onClick={startCountdown}>Start Countdown</button>
    </div>
  );
};

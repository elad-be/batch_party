import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuestions } from '../hooks/useQuestions';

interface GamePlayViewProps {
  dataHook?: string;
}

export const GamePlayView: React.FC<GamePlayViewProps> = ({
  dataHook = 'game-play-view',
}) => {
  const { questions } = useQuestions('answered');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  const currentQuestion = questions[currentIndex];

  const showQuestion = () => {
    setAnswerVisible(false);
    setCountdown(null);
  };

  useEffect(() => {
    showQuestion();
  }, [currentIndex, questions]);

  const startCountdown = () => {
    setCountdown(3);
    setTimeout(() => setCountdown(2), 800);
    setTimeout(() => setCountdown(1), 1600);
    setTimeout(() => {
      setCountdown(null);
      setAnswerVisible(true);
    }, 2400);
  };

  const toggleAnswer = () => {
    setAnswerVisible(!answerVisible);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const markMatch = (correct: boolean) => {
    if (correct) {
      setMatchCount((prev) => prev + 1);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="container" data-hook={dataHook}>
        <h1>Bachelorette Game: Live View</h1>
        <p>No more questions!</p>

        <div className="nav-buttons">
          <Link to="/" className="nav-button">
            Go to Admin Page
          </Link>
          <Link to="/answer" className="nav-button">
            Go to Answer Page
          </Link>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="container" data-hook={dataHook}>
      <h1>Bachelorette Game: Live View</h1>

      <div className="judge-panel-wrapper">
        <div className="match-counter">✔ Matches: {matchCount}</div>
        <div className="judge-panel">
          <button className="correct" onClick={() => markMatch(true)}>
            ✔
          </button>
          <button className="wrong" onClick={() => markMatch(false)}>
            ✖
          </button>
        </div>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="question-display">
        <p className="question-text">{currentQuestion.question}</p>

        {countdown && <div className="countdown">{countdown}</div>}

        <button onClick={startCountdown}>
          {answerVisible ? 'Hide Answer' : 'Show Answer'}
        </button>

        {answerVisible && (
          <>
            {currentQuestion.answered_audio_path ? (
              <audio controls src={`/${currentQuestion.answered_audio_path}`} />
            ) : (
              <p className="answer-text">{currentQuestion.answered_text}</p>
            )}
          </>
        )}
      </div>

      <div className="nav-buttons">
        <button onClick={prevQuestion}>Back</button>
        <button onClick={nextQuestion}>Next</button>
      </div>

      <div className="nav-buttons" style={{ marginTop: '20px' }}>
        <Link to="/" className="nav-button">
          Go to Admin Page
        </Link>
        <Link to="/answer" className="nav-button">
          Go to Answer Page
        </Link>
      </div>
    </div>
  );
};

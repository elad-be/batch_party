import { useEffect, useState } from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import { NoQuestionsMessage } from './NoQuestionsMessage';
import { PageNavigation } from './PageNavigation';
import './PlayPage.css';
import { ProgressBar } from './ProgressBar';
import { QuestionDisplay } from './QuestionDisplay';
import { QuestionNavigation } from './QuestionNavigation';
import { ScorePanel } from './ScorePanel';

interface PlayPageProps {
  dataHook?: string;
}

export const PlayPage: React.FC<PlayPageProps> = ({
  dataHook = 'play-page',
}) => {
  const { questions } = useQuestions('answered');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setAnswerVisible] = useState(false);
  const [matchCount, setMatchCount] = useState(0);

  const currentQuestion = questions[currentIndex];

  const showQuestion = () => {
    setAnswerVisible(false);
  };

  useEffect(() => {
    showQuestion();
  }, [currentIndex, questions]);

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
    return <NoQuestionsMessage dataHook="no-questions-message" />;
  }

  return (
    <div className="container" data-hook={dataHook}>
      <h1>Bachelorette Game: Live View</h1>

      <ScorePanel
        matchCount={matchCount}
        onMarkMatch={markMatch}
        dataHook="score-panel"
      />

      <ProgressBar
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        dataHook="progress-bar"
      />

      <QuestionDisplay question={currentQuestion} dataHook="question-display" />

      <QuestionNavigation
        onPrevious={prevQuestion}
        onNext={nextQuestion}
        dataHook="question-navigation"
        currentIndex={currentIndex}
      />

      <PageNavigation dataHook="page-navigation" />
    </div>
  );
};

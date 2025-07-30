import React from 'react';
import { PageNavigation } from './PageNavigation';

interface NoQuestionsMessageProps {
  dataHook?: string;
}

export const NoQuestionsMessage: React.FC<NoQuestionsMessageProps> = ({
  dataHook = 'no-questions-message',
}) => {
  return (
    <div className="container" data-hook={dataHook}>
      <h1>Bachelorette Game: Live View</h1>
      <p>No more questions!</p>
      <PageNavigation dataHook="page-navigation" />
    </div>
  );
};

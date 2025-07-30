import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationButtonsProps {
  dataHook?: string;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  dataHook = 'navigation-buttons',
}) => {
  return (
    <div className="nav-buttons" data-hook={dataHook}>
      <Link to="/answer" className="nav-button">
        Go to Answer Page
      </Link>
      <Link to="/play" className="nav-button">
        Go to Play Page
      </Link>
    </div>
  );
};

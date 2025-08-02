import React from 'react';
import { Link } from 'react-router-dom';
import './PageNavigation.css';

interface PageNavigationProps {
  dataHook?: string;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  dataHook = 'page-navigation',
}) => {
  return (
    <div
      className="nav-buttons"
      style={{ marginTop: '20px' }}
      data-hook={dataHook}
    >
      <Link to="/" className="nav-button">
        Go to Admin Page
      </Link>
      <Link to="/answer" className="nav-button">
        Go to Answer Page
      </Link>
    </div>
  );
};

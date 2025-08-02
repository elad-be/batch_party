import React from 'react';

type FilterType = 'all' | 'answered' | 'unanswered';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  dataHook?: string;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onFilterChange,
  dataHook = 'filter-buttons',
}) => {
  return (
    <div className="filter-buttons" data-hook={dataHook}>
      <button
        className={currentFilter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        className={currentFilter === 'answered' ? 'active' : ''}
        onClick={() => onFilterChange('answered')}
      >
        Answered
      </button>
      <button
        className={currentFilter === 'unanswered' ? 'active' : ''}
        onClick={() => onFilterChange('unanswered')}
      >
        Not Answered
      </button>
    </div>
  );
};

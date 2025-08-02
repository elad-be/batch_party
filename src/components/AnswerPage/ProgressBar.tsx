import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  dataHook?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  dataHook = 'progress-bar',
}) => {
  const percentage = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  return (
    <div data-hook={dataHook} style={{ marginBottom: '20px' }}>
      <div
        style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#666',
          marginBottom: '10px',
          fontWeight: '500',
        }}
      >
        Question {current + 1} of {total}
      </div>

      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#e9ecef',
          borderRadius: '5px',
          overflow: 'hidden',
          border: '1px solid #dee2e6',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#d81b60',
            borderRadius: '5px',
            transition: 'width 0.3s ease',
          }}
          data-hook="progress-fill"
        />
      </div>
    </div>
  );
};

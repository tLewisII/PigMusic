import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-label">
        Progress: {current} / {total}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        >
          {percentage >= 10 && (
            <span className="progress-pig">🐷</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
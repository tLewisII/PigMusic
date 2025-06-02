import React from 'react';
import { LevelProgress } from '../../types/game';
import './LevelSelect.css';

interface LevelSelectProps {
  levelProgress: LevelProgress[];
  onSelectLevel: (level: number) => void;
  onBack: () => void;
}

const LevelSelect: React.FC<LevelSelectProps> = ({
  levelProgress,
  onSelectLevel,
  onBack
}) => {
  const levelDescriptions = [
    'Learn C, D, and E notes',
    'Add F and G to your repertoire',
    'Master the full C major scale',
    'Challenge yourself with sharps!'
  ];

  const renderOinks = (count: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={`oink ${i < count ? 'earned' : 'empty'}`}>
        🐽
      </span>
    ));
  };

  const isLevelUnlocked = (levelNumber: number): boolean => {
    if (levelNumber === 1) return true;
    return levelProgress[levelNumber - 2]?.oinks > 0;
  };

  return (
    <div className="level-select">
      <button className="back-button" onClick={onBack}>
        ← Back to Menu
      </button>
      
      <h1 className="level-select-title">Choose Your Level! 🎵</h1>
      
      <div className="levels-grid">
        {levelProgress.map((level, index) => {
          const unlocked = isLevelUnlocked(level.levelNumber);
          
          return (
            <div
              key={level.levelNumber}
              className={`level-card ${!unlocked ? 'locked' : ''}`}
            >
              <h2 className="level-number">Level {level.levelNumber}</h2>
              <p className="level-description">{levelDescriptions[index]}</p>
              
              <div className="oinks-display">
                {renderOinks(level.oinks)}
              </div>
              
              <button
                className="play-level-button"
                onClick={() => onSelectLevel(level.levelNumber)}
                disabled={!unlocked}
              >
                {unlocked ? 'Play! 🎹' : '🔒 Locked'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelect;
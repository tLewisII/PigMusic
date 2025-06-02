import React, { useState, useEffect } from 'react';
import { GameState, GameSettings, LevelProgress } from './types/game';
import GameController from './components/GameEngine/GameController';
import LevelSelect from './components/UI/LevelSelect';
import './App.css';

const initialSettings: GameSettings = {
  volume: 0.7,
  soundEffects: true,
  musicEnabled: true,
  showHints: true,
  highContrast: false
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    currentNote: null,
    score: 0,
    strikes: 0,
    pigCoins: 0,
    unlockedItems: [],
    achievements: [],
    settings: initialSettings,
    streak: 0,
    notesCompleted: 0,
    notesInLevel: 10
  });

  const [levelProgress, setLevelProgress] = useState<LevelProgress[]>([
    { levelNumber: 1, oinks: 0, bestScore: 0, completed: false },
    { levelNumber: 2, oinks: 0, bestScore: 0, completed: false },
    { levelNumber: 3, oinks: 0, bestScore: 0, completed: false },
    { levelNumber: 4, oinks: 0, bestScore: 0, completed: false }
  ]);

  const [currentScreen, setCurrentScreen] = useState<'menu' | 'game' | 'levelSelect'>('menu');

  useEffect(() => {
    const savedData = localStorage.getItem('pigMusicSaveData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setLevelProgress(data.progress || levelProgress);
      setGameState(prev => ({
        ...prev,
        pigCoins: data.pigCoins || 0,
        unlockedItems: data.inventory || [],
        settings: data.settings || initialSettings
      }));
    }
  }, []);

  const saveProgress = () => {
    const saveData = {
      progress: levelProgress,
      pigCoins: gameState.pigCoins,
      inventory: gameState.unlockedItems,
      settings: gameState.settings
    };
    localStorage.setItem('pigMusicSaveData', JSON.stringify(saveData));
  };

  const handleLevelSelect = (level: number) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: level,
      score: 0,
      strikes: 0,
      streak: 0,
      notesCompleted: 0
    }));
    setCurrentScreen('game');
  };

  const handleLevelComplete = (oinks: number, score: number) => {
    const updatedProgress = [...levelProgress];
    const levelIndex = gameState.currentLevel - 1;
    
    if (levelIndex >= 0 && levelIndex < updatedProgress.length) {
      updatedProgress[levelIndex] = {
        ...updatedProgress[levelIndex],
        oinks: Math.max(oinks, updatedProgress[levelIndex].oinks),
        bestScore: Math.max(score, updatedProgress[levelIndex].bestScore),
        completed: true
      };
      
      setLevelProgress(updatedProgress);
      saveProgress();
    }
    
    setCurrentScreen('levelSelect');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  return (
    <div className="App">
      {currentScreen === 'menu' && (
        <div className="main-menu">
          <h1 className="game-title">🐷 PigMusic 🎵</h1>
          <p className="tagline">Learn to read music with your pig pal!</p>
          <button 
            className="play-button"
            onClick={() => setCurrentScreen('levelSelect')}
          >
            Play! 🎹
          </button>
        </div>
      )}
      
      {currentScreen === 'levelSelect' && (
        <LevelSelect
          levelProgress={levelProgress}
          onSelectLevel={handleLevelSelect}
          onBack={handleBackToMenu}
        />
      )}
      
      {currentScreen === 'game' && (
        <GameController
          gameState={gameState}
          setGameState={setGameState}
          onLevelComplete={handleLevelComplete}
          onBackToMenu={() => setCurrentScreen('levelSelect')}
        />
      )}
    </div>
  );
};

export default App;
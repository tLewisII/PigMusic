import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Note, NOTES_PER_LEVEL, STAFF_POSITIONS } from '../../types/game';
import VexFlowNoteDisplay from './VexFlowNoteDisplay';
import PianoKeyboard from './PianoKeyboard';
import PigMascot from '../Character/PigMascot';
import ProgressBar from '../UI/ProgressBar';
import AudioManager from '../../services/AudioManager';
import './GameController.css';

interface GameControllerProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onLevelComplete: (oinks: number, score: number) => void;
  onBackToMenu: () => void;
}

const GameController: React.FC<GameControllerProps> = ({
  gameState,
  setGameState,
  onLevelComplete,
  onBackToMenu
}) => {
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [pigMood, setPigMood] = useState<'idle' | 'happy' | 'encouraging' | 'celebrating'>('idle');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    AudioManager.setVolume(gameState.settings.volume);
    AudioManager.setSoundEffectsEnabled(gameState.settings.soundEffects);
  }, [gameState.settings]);

  const generateRandomNote = useCallback((): Note => {
    const availableNotes = NOTES_PER_LEVEL[gameState.currentLevel - 1] || NOTES_PER_LEVEL[0];
    const randomPitch = availableNotes[Math.floor(Math.random() * availableNotes.length)];
    
    return {
      pitch: randomPitch,
      staffPosition: STAFF_POSITIONS[randomPitch],
      accidental: randomPitch.includes('#') ? 'sharp' : undefined
    };
  }, [gameState.currentLevel]);

  useEffect(() => {
    if (!gameState.currentNote) {
      const newNote = generateRandomNote();
      setGameState(prev => ({ ...prev, currentNote: newNote }));
      setStartTime(Date.now());
    }
  }, [gameState.currentNote, generateRandomNote, setGameState]);

  const handleNoteSelect = (selectedNote: string) => {
    if (!gameState.currentNote) return;

    const responseTime = Date.now() - startTime;
    const isCorrect = selectedNote === gameState.currentNote.pitch;

    if (isCorrect) {
      const speedBonus = Math.max(0, 1000 - responseTime / 10);
      const streakBonus = gameState.streak * 50;
      const points = 100 + speedBonus + streakBonus;

      setPigMood('happy');
      setTimeout(() => setPigMood('idle'), 1500);
      
      AudioManager.playSuccessSound();

      setGameState(prev => ({
        ...prev,
        score: prev.score + points,
        streak: prev.streak + 1,
        strikes: 0,
        pigCoins: prev.pigCoins + 10,
        notesCompleted: prev.notesCompleted + 1,
        currentNote: null
      }));

      setShowHint(false);
    } else {
      setPigMood('encouraging');
      setTimeout(() => setPigMood('idle'), 1500);
      
      AudioManager.playErrorSound();

      setGameState(prev => ({
        ...prev,
        strikes: prev.strikes + 1,
        streak: 0
      }));

      if (gameState.strikes === 0 && gameState.settings.showHints) {
        setShowHint(true);
      }
    }
  };

  useEffect(() => {
    if (gameState.notesCompleted >= gameState.notesInLevel) {
      const oinks = calculateOinks();
      setPigMood('celebrating');
      AudioManager.playLevelCompleteSound();
      setTimeout(() => {
        onLevelComplete(oinks, gameState.score);
      }, 2000);
    }
  }, [gameState.notesCompleted, gameState.notesInLevel]);

  const calculateOinks = (): number => {
    const accuracy = (gameState.notesCompleted / (gameState.notesCompleted + gameState.strikes * 3)) * 100;
    if (accuracy >= 90) return 3;
    if (accuracy >= 70) return 2;
    return 1;
  };

  return (
    <div className="game-controller">
      <div className="game-header">
        <button className="back-button" onClick={onBackToMenu}>
          ← Back
        </button>
        <div className="game-stats">
          <div className="score">Score: {gameState.score}</div>
          <div className="coins">🪙 {gameState.pigCoins}</div>
          <div className="streak">🔥 {gameState.streak}</div>
        </div>
      </div>

      <div className="game-main">
        <div className="note-section">
          <VexFlowNoteDisplay 
            note={gameState.currentNote}
            showHint={showHint}
          />
          <ProgressBar 
            current={gameState.notesCompleted}
            total={gameState.notesInLevel}
          />
        </div>

        <div className="pig-section">
          <PigMascot 
            mood={pigMood}
            customization={gameState.unlockedItems.filter(item => item.equipped)}
          />
        </div>
      </div>

      <div className="piano-section">
        <PianoKeyboard 
          availableNotes={NOTES_PER_LEVEL[gameState.currentLevel - 1] || NOTES_PER_LEVEL[0]}
          onNoteSelect={handleNoteSelect}
          highlightedNote={showHint ? gameState.currentNote?.pitch : undefined}
        />
      </div>
    </div>
  );
};

export default GameController;
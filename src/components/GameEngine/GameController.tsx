import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Note, NOTES_PER_LEVEL, TREBLE_STAFF_POSITIONS, BASS_STAFF_POSITIONS } from '../../types/game';
import VexFlowNoteDisplay from './VexFlowNoteDisplay';
import PianoKeyboard from './PianoKeyboard';
import PigMascot from '../Character/PigMascot';
import ProgressBar from '../UI/ProgressBar';
import AudioManager from '../../services/AudioManager';
import './GameController.css';

interface GameControllerProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onLevelComplete: (oinks: number) => void;
  onBackToMenu: () => void;
}

const GameController: React.FC<GameControllerProps> = ({
  gameState,
  setGameState,
  onLevelComplete,
  onBackToMenu
}) => {
  const [pigMood, setPigMood] = useState<'idle' | 'happy' | 'encouraging' | 'celebrating'>('idle');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    AudioManager.setVolume(gameState.settings.volume);
    AudioManager.setSoundEffectsEnabled(gameState.settings.soundEffects);
  }, [gameState.settings]);

  const generateRandomNote = useCallback((): Note => {
    const clef = gameState.selectedClef;
    const availableNotes = NOTES_PER_LEVEL[clef][gameState.currentLevel - 1] || NOTES_PER_LEVEL[clef][0];
    const randomPitch = availableNotes[Math.floor(Math.random() * availableNotes.length)];
    const staffPositions = clef === 'treble' ? TREBLE_STAFF_POSITIONS : BASS_STAFF_POSITIONS;
    
    return {
      pitch: randomPitch,
      staffPosition: staffPositions[randomPitch],
      accidental: randomPitch.includes('#') ? 'sharp' : undefined,
      clef: clef
    };
  }, [gameState.currentLevel, gameState.selectedClef]);

  useEffect(() => {
    if (!gameState.currentNote) {
      const newNote = generateRandomNote();
      setGameState(prev => ({ ...prev, currentNote: newNote }));
      setStartTime(Date.now());
    }
  }, [gameState.currentNote, generateRandomNote, setGameState]);

  const handleNoteSelect = (selectedNote: string) => {
    if (!gameState.currentNote) return;

    const isCorrect = selectedNote === gameState.currentNote.pitch;

    if (isCorrect) {
      setPigMood('happy');
      setTimeout(() => setPigMood('idle'), 1500);

      AudioManager.playSuccessSound();

      setGameState(prev => ({
        ...prev,
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

  const calculateOinks = useCallback((): number => {
    const accuracy = (gameState.notesCompleted / (gameState.notesCompleted + gameState.strikes * 3)) * 100;
    if (accuracy >= 90) return 3;
    if (accuracy >= 70) return 2;
    return 1;
  }, [gameState.notesCompleted, gameState.strikes]);

  useEffect(() => {
    if (gameState.notesCompleted >= gameState.notesInLevel) {
      const oinks = calculateOinks();
      setPigMood('celebrating');
      AudioManager.playLevelCompleteSound();
      setTimeout(() => {
        onLevelComplete(oinks);
      }, 2000);
    }
  }, [gameState.notesCompleted, gameState.notesInLevel, calculateOinks, onLevelComplete]);

  const renderOinks = (count: number) =>
    Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={`oink-icon ${i < count ? 'earned' : 'empty'}`}>🐽</span>
    ));

  return (
    <div className="game-controller">
      <div className="game-header">
        <button className="back-button" onClick={onBackToMenu}>
          ← Back
        </button>
        <div className="game-stats">
          <div className="oinks">{renderOinks(calculateOinks())}</div>
          <div className="coins">🪙 {gameState.pigCoins}</div>
          <div className="super-oink">🐽 {gameState.streak}</div>
        </div>
      </div>

      <div className="game-main">
        <div className="note-section">
          <VexFlowNoteDisplay 
            note={gameState.currentNote}
            showHint={showHint}
            clef={gameState.currentNote?.clef || gameState.selectedClef}
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
          availableNotes={NOTES_PER_LEVEL[gameState.selectedClef][gameState.currentLevel - 1] || NOTES_PER_LEVEL[gameState.selectedClef][0]}
          onNoteSelect={handleNoteSelect}
          highlightedNote={showHint ? gameState.currentNote?.pitch : undefined}
        />
      </div>
    </div>
  );
};

export default GameController;
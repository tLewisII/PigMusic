import React from 'react';
import AudioManager from '../../services/AudioManager';
import './PianoKeyboard.css';

interface PianoKeyboardProps {
  availableNotes: string[];
  onNoteSelect: (note: string) => void;
  highlightedNote?: string;
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  availableNotes,
  onNoteSelect,
  highlightedNote
}) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F'];
  const blackKeys = ['C#', 'D#', null, 'F#', 'G#', 'A#', null, 'C#', 'D#', null];
  
  const isNoteAvailable = (note: string, octave: string = '4'): boolean => {
    return availableNotes.includes(note + octave);
  };

  const getNoteName = (note: string, index: number): string => {
    // After B (index 6), we move to octave 5
    const octave = index <= 6 ? '4' : '5';
    return note + octave;
  };

  const handleKeyPress = async (note: string) => {
    // Extract note name and octave
    const noteName = note.slice(0, -1);
    const octave = note.slice(-1);
    
    if (isNoteAvailable(noteName, octave)) {
      await AudioManager.playNote(note);
      onNoteSelect(note);
    }
  };

  return (
    <div className="piano-keyboard">
      <div className="keys-container">
        {whiteKeys.map((note, index) => {
          const fullNote = getNoteName(note, index);
          const octave = index <= 6 ? '4' : '5';
          const available = isNoteAvailable(note, octave);
          const highlighted = highlightedNote === fullNote;
          
          return (
            <div key={index} className="key-wrapper">
              <button
                className={`white-key ${!available ? 'disabled' : ''} ${highlighted ? 'highlighted' : ''}`}
                onClick={() => handleKeyPress(fullNote)}
                disabled={!available}
              >
                <span className="key-label">{note}{octave}</span>
              </button>
              
              {index < blackKeys.length && blackKeys[index] && (
                <button
                  className={`black-key ${!isNoteAvailable(blackKeys[index]!, octave) ? 'disabled' : ''} ${highlightedNote === blackKeys[index] + octave ? 'highlighted' : ''}`}
                  onClick={() => handleKeyPress(blackKeys[index] + octave)}
                  disabled={!isNoteAvailable(blackKeys[index]!, octave)}
                >
                  <span className="key-label">{blackKeys[index]}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PianoKeyboard;
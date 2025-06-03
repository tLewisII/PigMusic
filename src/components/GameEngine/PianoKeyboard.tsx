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
  // Determine octave range from available notes
  const octaves = Array.from(new Set(availableNotes.map(note => parseInt(note.slice(-1)))));
  const minOctave = Math.min(...octaves);
  const maxOctave = Math.max(...octaves);
  
  // Generate piano keys for the octave range
  const whiteKeyPattern = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeyPattern = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];
  
  const whiteKeys: string[] = [];
  const blackKeys: (string | null)[] = [];
  
  for (let octave = minOctave; octave <= maxOctave; octave++) {
    whiteKeyPattern.forEach((note, index) => {
      whiteKeys.push(note);
      if (octave < maxOctave || index < whiteKeyPattern.indexOf(availableNotes[availableNotes.length - 1].slice(0, -1))) {
        blackKeys.push(blackKeyPattern[index]);
      }
    });
  }
  
  const isNoteAvailable = (note: string, octave: string): boolean => {
    return availableNotes.includes(note + octave);
  };

  const getNoteName = (note: string, index: number): string => {
    const octaveOffset = Math.floor(index / 7);
    const octave = minOctave + octaveOffset;
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
          const octaveNum = Math.floor(index / 7) + minOctave;
          const octave = octaveNum.toString();
          const available = isNoteAvailable(note, octave);
          const highlighted = highlightedNote === fullNote;
          const blackKeyIndex = index % 7;
          
          return (
            <div key={index} className="key-wrapper">
              <button
                className={`white-key ${!available ? 'disabled' : ''} ${highlighted ? 'highlighted' : ''}`}
                onClick={() => handleKeyPress(fullNote)}
                disabled={!available}
              >
                <span className="key-label">{note}{octave}</span>
              </button>
              
              {blackKeyIndex < blackKeyPattern.length && blackKeyPattern[blackKeyIndex] && (
                <button
                  className={`black-key ${!isNoteAvailable(blackKeyPattern[blackKeyIndex]!, octave) ? 'disabled' : ''} ${highlightedNote === blackKeyPattern[blackKeyIndex] + octave ? 'highlighted' : ''}`}
                  onClick={() => handleKeyPress(blackKeyPattern[blackKeyIndex] + octave)}
                  disabled={!isNoteAvailable(blackKeyPattern[blackKeyIndex]!, octave)}
                >
                  <span className="key-label">{blackKeyPattern[blackKeyIndex]}</span>
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
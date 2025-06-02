import React from 'react';
import { Note } from '../../types/game';
import './NoteDisplay.css';

interface NoteDisplayProps {
  note: Note | null;
  showHint: boolean;
}

const NoteDisplay: React.FC<NoteDisplayProps> = ({ note, showHint }) => {
  const renderStaffLines = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="staff-line" />
    ));
  };

  const getNotePosition = (staffPosition: number): number => {
    // Staff lines are at 20, 40, 60, 80, 100 (top to bottom)
    // Each line/space is 20px apart
    // Note positions are centered on lines or in spaces
    const basePosition = 20; // Top staff line
    const spacing = 20; // Space between lines
    
    // Calculate position from top of staff
    // Even numbers are on lines, odd numbers are in spaces
    const position = basePosition + (staffPosition * spacing);
    
    // Adjust for note head centering (note head is 40px tall)
    return position - 20; // Center the note head on the line/space
  };

  return (
    <div className="note-display">
      <div className="staff">
        {renderStaffLines()}
        
        <div className="clef">𝄞</div>
        
        {note && (
          <>
            {/* Add ledger line for C4 */}
            {note.staffPosition === 0 && (
              <div 
                className="ledger-line" 
                style={{ 
                  top: `${110}px`, // Ledger line at C4 position
                  left: '45%',
                  width: '10%' 
                }}
              />
            )}
            
            <div 
              className={`note ${showHint ? 'hint' : ''}`}
              style={{ top: `${getNotePosition(note.staffPosition)}px` }}
            >
              <div className="note-head">♩</div>
              {note.accidental === 'sharp' && (
                <div className="accidental">♯</div>
              )}
              {note.accidental === 'flat' && (
                <div className="accidental">♭</div>
              )}
            </div>
          </>
        )}
      </div>
      
      {showHint && note && (
        <div className="hint-text">
          Hint: This note is {note.pitch.replace('4', '').replace('5', '')}
          {note.pitch.includes('5') ? ' (high)' : ''}
        </div>
      )}
    </div>
  );
};

export default NoteDisplay;
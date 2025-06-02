import React from 'react';
import { Clef } from '../../types/game';
import './ClefSelector.css';

interface ClefSelectorProps {
  onSelectClef: (clef: Clef) => void;
}

const ClefSelector: React.FC<ClefSelectorProps> = ({ onSelectClef }) => {
  return (
    <div className="clef-selector">
      <h2>Choose Your Clef</h2>
      <div className="clef-options">
        <button 
          className="clef-option treble-clef"
          onClick={() => onSelectClef('treble')}
          aria-label="Select Treble Clef"
        >
          <div className="clef-icon">🎼</div>
          <h3>Treble Clef</h3>
          <p>Higher notes (C4 - F5)</p>
        </button>
        
        <button 
          className="clef-option bass-clef"
          onClick={() => onSelectClef('bass')}
          aria-label="Select Bass Clef"
        >
          <div className="clef-icon">🎵</div>
          <h3>Bass Clef</h3>
          <p>Lower notes (E2 - C4)</p>
        </button>
      </div>
    </div>
  );
};

export default ClefSelector;
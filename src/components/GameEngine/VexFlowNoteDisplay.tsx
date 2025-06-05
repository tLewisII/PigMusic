import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow';
import { Note, Clef } from '../../types/game';
import './NoteDisplay.css';

interface VexFlowNoteDisplayProps {
  note: Note | null;
  showHint: boolean;
  clef: Clef;
}

const VexFlowNoteDisplay: React.FC<VexFlowNoteDisplayProps> = ({ note, showHint, clef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous render
    containerRef.current.innerHTML = '';

    // Responsive sizing based on screen width
    const isMobile = window.innerWidth <= 768;
    const width = isMobile ? 320 : 500;
    const height = isMobile ? 120 : 250;
    const staveWidth = isMobile ? 240 : 400;
    const staveX = isMobile ? 40 : 10;
    const staveY = isMobile ? 0 : 60;

    // Create renderer
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(width, height);
    rendererRef.current = renderer;

    const context = renderer.getContext();
    context.setFont('Arial', 10);

    // Create a stave (staff)
    // Adjust vertical position to ensure enough space for ledger lines
    const stave = new Stave(staveX, staveY, staveWidth);
    stave.addClef(clef);
    stave.setContext(context).draw();

    // If there's a note to display, render it
    if (note) {
      // Map our note format to VexFlow format
      // VexFlow expects format like "c/4" or "c#/4"
      let vexNote = note.pitch.toLowerCase();
      vexNote = vexNote.replace(/([a-g]#?)(\d)/, '$1/$2');            
      console.log(`Rendering ${clef} clef note:`, note.pitch, 'as VexFlow note:', vexNote);
      
      // Create the note
      const staveNote = new StaveNote({
        keys: [vexNote],
        duration: 'q', // quarter note
        clef: clef,  // Explicitly set the clef for the note
      });

      // Add accidental symbol when needed so the sharp appears on the staff
      if (note.pitch.includes('#')) {
        staveNote.addModifier(new Accidental('#'), 0);
      }

      // Color the note if hint is shown
      if (showHint) {
        staveNote.setStyle({ fillStyle: '#FF69B4', strokeStyle: '#FF69B4' });
      }

      // Create a voice and add the note
      const voice = new Voice({ numBeats: 1, beatValue: 4 });
      voice.addTickables([staveNote]);

      // Format and draw
      const formatterWidth = isMobile ? 200 : 350;
      new Formatter().joinVoices([voice]).format([voice], formatterWidth);
      voice.draw(context, stave);
    }
  }, [note, showHint, clef]);

  return (
    <div className="note-display">
      <div ref={containerRef} className="vexflow-container" />
      
      {showHint && note && (
        <div className="hint-text">
          Hint: This note is {note.pitch.replace('#', '♯')}
        </div>
      )}
    </div>
  );
};

export default VexFlowNoteDisplay;
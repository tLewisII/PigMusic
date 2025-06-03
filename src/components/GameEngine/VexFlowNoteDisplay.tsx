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

    // Create renderer
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(500, 250);
    rendererRef.current = renderer;

    const context = renderer.getContext();
    context.setFont('Arial', 10);

    // Create a stave (staff)
    // Adjust vertical position to ensure enough space for ledger lines
    const stave = new Stave(10, 60, 400);
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
      new Formatter().joinVoices([voice]).format([voice], 350);
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
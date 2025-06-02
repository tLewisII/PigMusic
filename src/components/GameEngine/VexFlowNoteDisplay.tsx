import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow';
import { Note } from '../../types/game';
import './NoteDisplay.css';

interface VexFlowNoteDisplayProps {
  note: Note | null;
  showHint: boolean;
}

const VexFlowNoteDisplay: React.FC<VexFlowNoteDisplayProps> = ({ note, showHint }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous render
    containerRef.current.innerHTML = '';

    // Create renderer
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(500, 200);
    rendererRef.current = renderer;

    const context = renderer.getContext();
    context.setFont('Arial', 10);

    // Create a stave (staff)
    const stave = new Stave(10, 40, 400);
    stave.addClef('treble');
    stave.setContext(context).draw();

    // If there's a note to display, render it
    if (note) {
      // Map our note format to VexFlow format
      // Handle sharps/flats in the pitch string
      let vexNote = note.pitch.toLowerCase();
      if (vexNote.includes('#')) {
        // C#4 -> c#/4
        vexNote = vexNote.replace('4', '/4').replace('5', '/5');
      } else {
        // C4 -> c/4
        vexNote = vexNote.replace('4', '/4').replace('5', '/5');
      }
      
      // Create the note
      const staveNote = new StaveNote({
        keys: [vexNote],
        duration: 'q', // quarter note
      });

      // Add accidental symbol when needed so the sharp appears on the staff
      if (note.pitch.includes('#')) {
        staveNote.addAccidental(0, new Accidental('#'));
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
  }, [note, showHint]);

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
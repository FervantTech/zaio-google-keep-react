import React from "react";
import "./Notes.css";

function Notes({ notes, deleteNote, selectNote, togglePin }) {
  return (
    <div className="notes">
      {[...notes]
        .sort((a, b) => Number(b.pinned) - Number(a.pinned))
        .map((note) => (
          <div
            className="note"
            key={note.id}
            onClick={() => selectNote(note.id)}
          >
            <span className="material-symbols-outlined check-circle">
              check_circle
            </span>

            <div 
              className="tooltip pin-note"
              onClick={(event) => {
                event.stopPropagation();
                togglePin(note.id);
              }}
            >
              <span
                className={`material-symbols-outlined hover pin ${
                  note.pinned ? "pinned" : ""
                }`}
              >
                keep
              </span>
              <span className="tooltip-text">
                {note.pinned ? "Unpin note" : "Pin note"}
              </span>
            </div>

            <div className="title">{note.title}</div>
            <div className="text">{note.text}</div>

            <div className="note-footer">
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  palette
                </span>
                <span className="tooltip-text">Background options</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  add_alert
                </span>
                <span className="tooltip-text">Remind me</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  person_add
                </span>
                <span className="tooltip-text">Collaborator</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  image
                </span>
                <span className="tooltip-text">Add image</span>
              </div>

              <div
                className="tooltip archive"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteNote(note.id);
                }}
              >
                <span className="material-symbols-outlined hover small-icon">
                  archive
                </span>
                <span className="tooltip-text">Archive</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  more_vert
                </span>
                <span className="tooltip-text">More</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Notes;

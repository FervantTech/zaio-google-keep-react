import React, { useEffect, useState } from "react";
import "./Modal.css";

function Modal({ note, editNote, closeModal, deleteNote }) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  useEffect(() => {
    setTitle(note.title);
    setText(note.text);
  }, [note]);

  const handleSubmit = (event) => {
    event.preventDefault();
    editNote(note.id, title, text);
  };

  return (
    <div className="modal open-modal" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="note-title"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <input
              type="text"
              className="note-text"
              placeholder="Take a note..."
              value={text}
              onChange={(event) => setText(event.target.value)}
            />

            <div className="form-actions">
              <div className="icons">
                <div className="icons">
                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon text-icon">
                      text_format
                    </span>
                    <span className="tooltip-text">Formatting Options</span>
                  </div>

                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      palette
                    </span>
                    <span className="tooltip-text">Change Color</span>
                  </div>

                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      add_alert
                    </span>
                    <span className="tooltip-text">Add Reminder</span>
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
                    <span className="tooltip-text">Add Image</span>
                  </div>

                  <div
                    className="tooltip archive"
                    onClick={() => {
                      deleteNote(note.id);
                      closeModal();
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

                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      undo
                    </span>
                    <span className="tooltip-text">Undo</span>
                  </div>

                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      redo
                    </span>
                    <span className="tooltip-text">Redo</span>
                  </div>
                </div>
                
              </div>

              <button type="submit" className="close-btn">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import React, { useEffect, useState } from "react";
import "./Modal.css";

// The modal uses the same curated colors as the note cards.
const NOTE_COLORS = [
  { name: "Default", value: "" },
  { name: "Coral", value: "#f28b82" },
  { name: "Peach", value: "#fbbc04" },
  { name: "Sand", value: "#fff475" },
  { name: "Mint", value: "#ccff90" },
  { name: "Sage", value: "#a7ffeb" },
  { name: "Blue", value: "#aecbfa" },
  { name: "Lavender", value: "#d7aefb" },
];

function Modal({ note, editNote, closeModal, deleteNote, changeNoteColor }) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Keep modal text readable on every preset background.
  const getTextColor = (backgroundColor) => {
    if (!backgroundColor) return undefined;

    const red = parseInt(backgroundColor.slice(1, 3), 16);
    const green = parseInt(backgroundColor.slice(3, 5), 16);
    const blue = parseInt(backgroundColor.slice(5, 7), 16);
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

    return brightness > 140 ? "#202124" : "#ffffff";
  };

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
        <div
          className="form-container"
          style={{
            backgroundColor: note.color || undefined,
            color: getTextColor(note.color),
          }}
        >
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="note-title"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              style={{ color: getTextColor(note.color) }}
            />

            <input
              type="text"
              className="note-text"
              placeholder="Take a note..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              style={{ color: getTextColor(note.color) }}
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

                  {/* Allow the note color to be changed without closing the modal. */}
                  <div className="tooltip color-picker">
                    <span className="material-symbols-outlined hover small-icon">
                      palette
                    </span>
                    <span className="tooltip-text">Change Color</span>
                    <button
                      type="button"
                      className="palette-trigger"
                      aria-label="Choose note background color"
                      aria-expanded={isPaletteOpen}
                      onClick={() => setIsPaletteOpen((isOpen) => !isOpen)}
                    />
                    {isPaletteOpen && (
                      <div className="color-palette" aria-label="Note colors">
                        {NOTE_COLORS.map((color) => (
                          <button
                            type="button"
                            key={color.name}
                            className={`color-swatch ${
                              (note.color || "") === color.value
                                ? "selected"
                                : ""
                            }`}
                            style={{
                              backgroundColor: color.value || "var(--surface)",
                            }}
                            aria-label={color.name}
                            title={color.name}
                            onClick={() => {
                              changeNoteColor(note.id, color.value);
                              setIsPaletteOpen(false);
                            }}
                          />
                        ))}
                      </div>
                    )}
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

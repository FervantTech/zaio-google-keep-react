import React, { useState } from "react";
import "./Form.css";

// Preset colors available while creating a note.
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

function Form({ addNote }) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  // Every provided color is light, so dark text gives the clearest preview.
  const noteTextColor = color ? "#202124" : undefined;

  const handleSubmit = (event) => {
    event.preventDefault();

    addNote(title, text, color);

    setExpanded(false);
    setTitle("");
    setText("");
    setColor("");
    setIsPaletteOpen(false);
  };

  return (
    <>
      {!expanded && (
        <div
          className="form-container inactive-form"
          onClick={() => setExpanded(true)}
        >
          <form>
            <input
              type="text"
              className="note-text"
              placeholder="Take a note..."
            />
            <div className="form-actions">
              <div className="tooltip">
                <span className="material-symbols-outlined hover">
                  check_box
                </span>
                <span className="tooltip-text">New List</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover">brush</span>
                <span className="tooltip-text">New Drawing</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover">image</span>
                <span className="tooltip-text">New Image</span>
              </div>
            </div>
          </form>
        </div>
      )}

      {expanded && (
        // Preview the selected background before the note is saved.
        <div
          className="form-container active-form"
          onSubmit={handleSubmit}
          style={{ backgroundColor: color || undefined }}
        >
          <form className="form" id="form">
            <input
              id="note-title"
              type="text"
              className="note-title"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              style={{ color: noteTextColor }}
            />
            <input
              id="note-text"
              type="text"
              className="note-text"
              placeholder="Take a note..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              style={{ color: noteTextColor }}
            />
            <div className="form-actions">
              <div className="icons">
                <div className="tooltip">
                  <span className="material-symbols-outlined hover small-icon text-icon">
                    text_format
                  </span>
                  <span className="tooltip-text">Remind me</span>
                </div>
                {/* Choose a preset background for the new note. */}
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
                      {NOTE_COLORS.map((noteColor) => (
                        <button
                          type="button"
                          key={noteColor.name}
                          className={`color-swatch ${
                            color === noteColor.value ? "selected" : ""
                          }`}
                          style={{
                            backgroundColor:
                              noteColor.value || "var(--surface)",
                          }}
                          aria-label={noteColor.name}
                          title={noteColor.name}
                          onClick={() => {
                            setColor(noteColor.value);
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
                  <span className="tooltip-text">Add Image</span>
                </div>
                <div className="tooltip">
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
              <button
                type="submit"
                className="close-btn"
              
              >
                close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Form;

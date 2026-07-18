import React, { useState } from "react";
import "./Notes.css";

// A small set of note colors inspired by Google Keep.
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

function Notes({
  notes,
  deleteNote,
  selectNote,
  togglePin,
  changeNoteColor,
}) {
  const [openPaletteId, setOpenPaletteId] = useState(null);

  // Pick black or white text based on the selected background's brightness.
  const getTextColor = (backgroundColor) => {
    if (!backgroundColor) return undefined;

    const red = parseInt(backgroundColor.slice(1, 3), 16);
    const green = parseInt(backgroundColor.slice(3, 5), 16);
    const blue = parseInt(backgroundColor.slice(5, 7), 16);
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

    return brightness > 140 ? "#202124" : "#ffffff";
  };

  return (
    <div className="notes">
      {/* Sort pinned notes to the top without changing the stored note order. */}
      {[...notes]
        .sort((a, b) => Number(b.pinned) - Number(a.pinned))
        .map((note) => (
          // Apply the saved color while preserving the current theme by default.
          <div
            className="note"
            key={note.id}
            style={{
              backgroundColor: note.color || undefined,
              color: getTextColor(note.color),
            }}
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

            <div
              className="note-footer"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Show a compact preset palette for the selected note. */}
              <div className="tooltip color-picker">
                <span className="material-symbols-outlined hover small-icon">
                  palette
                </span>
                <span className="tooltip-text">Background options</span>
                <button
                  type="button"
                  className="palette-trigger"
                  aria-label="Choose note background color"
                  aria-expanded={openPaletteId === note.id}
                  onClick={() =>
                    setOpenPaletteId((currentId) =>
                      currentId === note.id ? null : note.id,
                    )
                  }
                />
                {openPaletteId === note.id && (
                  <div className="color-palette" aria-label="Note colors">
                    {NOTE_COLORS.map((color) => (
                      <button
                        type="button"
                        key={color.name}
                        className={`color-swatch ${
                          (note.color || "") === color.value ? "selected" : ""
                        }`}
                        style={{ backgroundColor: color.value || "var(--surface)" }}
                        aria-label={color.name}
                        title={color.name}
                        onClick={() => {
                          changeNoteColor(note.id, color.value);
                          setOpenPaletteId(null);
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

import React, { useState, useEffect } from "react";
import Form from "./Components/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Notes from "./Components/Notes/Notes";
import Modal from "./Components/Modal/Modal";

const App = () => {
  // AI-assisted feature: restore the saved theme or use the system preference.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) return savedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const selectNote = (id) => {
    setSelectedNoteId(id);
    setIsModalOpen(true);
  };
const selectedNote = notes.find(
  (note) => note.id === selectedNoteId
);

  const addNote = (title, text, color) => {
    if (!title.trim() && !text.trim()) {
  return;
}

    const newNote = {
      id: Date.now(),
      title: title,
      text: text,
      pinned: false,
      color,
    };

    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, title, text) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              text,
            }
          : note,
      ),
    );

    setIsModalOpen(false);
    setSelectedNoteId(null);
  };
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Persist the selected theme whenever the user changes it.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Manual feature: toggle a note's pinned state so pinned notes appear first.
  const togglePin = (id) => {
  setNotes((previousNotes) =>
    previousNotes.map((note) =>
      note.id === id
        ? {
            ...note,
            pinned: !note.pinned,
          }
        : note,
    ),
  );
};

  // AI-assisted feature: save a custom background color on the selected note.
  const changeNoteColor = (id, color) => {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === id ? { ...note, color } : note,
      ),
    );
  };

  return (
    <div className="App">
      <Navbar
        theme={theme}
        toggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
          )
        }
      />
      <Sidebar />
      <Form addNote={addNote} />
      <Notes
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        togglePin={togglePin}
        changeNoteColor={changeNoteColor}
      />
      {isModalOpen && selectedNote && (
        <Modal
          note={selectedNote}
          editNote={editNote}
          changeNoteColor={changeNoteColor}
          closeModal={() => {
            setIsModalOpen(false);
            setSelectedNoteId(null);
          }}
          deleteNote={deleteNote}
        />
      )}
    </div>
  );
};

export default App;

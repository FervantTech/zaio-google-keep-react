import React, { useState, useEffect } from "react";
import Form from "./Components/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Notes from "./Components/Notes/Notes";
import Modal from "./Components/Modal/Modal";

const App = () => {
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

  const addNote = (title, text) => {
    if (!title.trim() && !text.trim()) {
  return;
}

    const newNote = {
      id: Date.now(),
      title: title,
      text: text,
      pinned: false,
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
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Form addNote={addNote} />
      <Notes notes={notes} deleteNote={deleteNote} selectNote={selectNote} togglePin={togglePin} />
      {isModalOpen && selectedNote && (
        <Modal
          note={selectedNote}
          editNote={editNote}
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

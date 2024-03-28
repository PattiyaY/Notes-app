import React, { useState } from "react";
import "./App.css";

// Create new type and specific the type of each properties
type Note = {
  id: number;
  title: string;
  description: string;
};

//Main App
const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Note title 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Note title 2",
      description: "Description 2",
    },
    {
      id: 3,
      title: "Note title 3",
      description: "Description 3",
    },
    {
      id: 4,
      title: "Note title 4",
      description: "Description 4",
    },
    {
      id: 5,
      title: "Note title 5",
      description: "Description 5",
    },
  ]);

  // State variable
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedNote, setSelectedNoted] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNoted(note);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    //Check retrieve value
    // console.log("title: ", title);
    // console.log("description: ", description);

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      description: description,
    };

    //Update array insert new note and also keep old notes
    setNotes([newNote, ...notes]);

    // Set Title, Description
    setTitle("");
    setDescription("");
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    //Update note information
    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      description: description,
    };

    //Update specific note in the note list
    const updateNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updateNote : note
    );

    //Update list
    setNotes(updateNotesList);

    //Set to default
    setTitle("");
    setDescription("");
    setSelectedNoted(null);
  };

  const handleCancel = () => {
    //Set to default
    setTitle("");
    setDescription("");
    setSelectedNoted(null);
  };

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    //
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
      >
        <h3>Add your note here!</h3>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          rows={10}
          required
        />

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button type="submit" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" onClick={() => handleNoteClick(note)}>
            <div
              className="notes-header"
              onClick={(event) => deleteNote(event, note.id)}
            >
              <button type="submit">x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

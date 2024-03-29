import React, { useEffect, useState } from "react";
import "./App.css";

// Create new type and specific the type of each properties
type Note = {
  id: number;
  title: string;
  description: string;
};

//Main App
const App = () => {
  //Set default
  const [notes, setNotes] = useState<Note[]>([]);

  // State variable
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedNote, setSelectedNoted] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/notes");

        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNoted(note);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const newNote = await response.json();
      //Update array insert new note and also keep old notes
      setNotes([newNote, ...notes]);

      // Set Title, Description
      setTitle("");
      setDescription("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const updateNote = await response.json();

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    //Set to default
    setTitle("");
    setDescription("");
    setSelectedNoted(null);
  };

  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    try {
      const response = await fetch(
        `http://localhost:5001/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );

      const updatedNotes = notes.filter((note) => note.id !== noteId);

      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default App;

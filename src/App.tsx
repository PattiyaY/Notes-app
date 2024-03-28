import { useState } from "react";
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
      description: "Description 1",
    },
    {
      id: 3,
      title: "Note title 3",
      description: "Description 1",
    },
    {
      id: 4,
      title: "Note title 4",
      description: "Description 1",
    },
    {
      id: 5,
      title: "Note title 5",
      description: "Description 1",
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="app-container">
      <form className="note-form">
        <h3>Add your note here!</h3>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea placeholder="Description" rows={10} required />

        <button className="add-note" type="submit">
          Add Note
        </button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item">
            <div className="notes-header">
              <button className="del-note" type="submit">
                x
              </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
          </div>
        ))}
        <div className="note-item">
          <div className="notes-header">
            <button className="del-note" type="submit">
              x
            </button>
          </div>
          <h2>Note Title</h2>
          <p>Note content</p>
        </div>
      </div>
    </div>
  );
};

export default App;

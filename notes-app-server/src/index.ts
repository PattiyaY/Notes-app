import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

//Retrieve data from a server (Read)
app.get("/api/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

//Sends data to a server to create (Insert)
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  //4xx -> Check client mistakes
  if (!title || !description) {
    return res.status(400).send("title and description fields required");
  }

  const note = await prisma.note.create({
    data: { title, description },
  });
  res.json(note);

  //Catch other error
  try {
    const note = await prisma.note.create({
      data: { title, description },
    });
    res.json(note);
  } catch (error) {
    //5xx -> Check server mistakes
    res.status(500).send("Oops something went wrong");
  }
});

//Edit data from a server (Update)
app.put("/api/notes/:id", async (req, res) => {
  const { title, description } = req.body;
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be valid number!");
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, description },
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send("Oops something went wrong");
  }
});

//Remove data from a server (Delete)
app.delete("/api/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be valid number!");
  }

  try {
    await prisma.note.delete({
      where: { id },
    });

    //204 -> No content. The request succeeded
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Oops something went wrong");
  }
});

//Check whether DB is working
app.listen(5001, () => {
  console.log("server running on localhost:5001");
});

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

//Retrieve data from a server
app.get("/api/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

//Sends data to a server to create or update a resource
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send("title and description fields required");
  }

  const note = await prisma.note.create({
    data: { title, description },
  });
  res.json(note);

  ///Catch other error
  try {
    const note = await prisma.note.create({
      data: { title, description },
    });
    res.json(note);
  } catch (error) {
    res.status(500).send("Oops something went wrong");
  }
});

app.listen(5001, () => {
  console.log("server running on localhost:5001");
});

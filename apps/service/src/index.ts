import "dotenv/config";
import express from "express";
import { db } from "@shortform-flashcards/db-client";

const app = express();

app.get("/", async function (_, res) {
  res.send(JSON.stringify(await db.flashcard.getAllFlashcardsForUser()));
});

app.listen(process.env.PORT);

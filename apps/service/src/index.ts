import "dotenv/config";
import cors from "cors";
import express from "express";
import { PATH } from "@shortform-flashcards/types";
import { getUserFlashcardsController } from "./features/flashcards/controllers/get_user_flashcards_controller";
import { answerFlashcardsController } from "./features/flashcards/controllers/answer_flashcards_controller";

const app = express();

app.use(express.json());
app.use(cors());

// Note that this endpoint returns all flashcards and filtering is done on the client. We could actually
// just send the flashcards needed for review to improve performance. However, I chose to implement it
// this way for now because if we implement a flashcards CRUD, I wouldn't have to add an extra endpoint
// to get the list of flashcards.
app.get(PATH.flashcards.getFlashcards, getUserFlashcardsController);

app.post(PATH.flashcards.answerFlashcard, answerFlashcardsController);

app.listen(process.env.PORT);

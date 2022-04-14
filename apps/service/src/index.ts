import "dotenv/config";
import cors from "cors";
import express from "express";
import { PATH } from "@shortform-flashcards/types";
import { getUserFlashcardsController } from "./features/flashcards/controllers/get_user_flashcards_controller";

const app = express();

app.use(cors());

app.get(PATH.flashcards.getFlashcards, getUserFlashcardsController);

app.listen(process.env.PORT);

import "dotenv/config";
import cors from "cors";
import express from "express";
import { PATH } from "@shortform-flashcards/types";
import { getUserFlashcardsController } from "./features/flashcards/controllers/get_user_flashcards_controller";
import { answerFlashcardsController } from "./features/flashcards/controllers/answer_flashcards_controller";
import { registerUserController } from "./features/user/controllers/register_user_controller";

const app = express();

app.use(express.json());
app.use(cors());

app.post(PATH.user.register, registerUserController);

// Note that this endpoint returns all flashcards and filtering is done on the client. We could actually
// just send the flashcards needed for review to improve performance. I don't have a strong opinion one
// way or the other as for small amounts of flashcards it probably doesn't matter much.
app.get(PATH.flashcards.getFlashcards, getUserFlashcardsController);

app.post(PATH.flashcards.answerFlashcard, answerFlashcardsController);

app.listen(process.env.PORT);

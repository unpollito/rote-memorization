import "dotenv/config";
import cors from "cors";
import express from "express";
import { PATH } from "@shortform-flashcards/types";
import { getUserFlashcardsController } from "./features/flashcards/controllers/get_user_flashcards_controller";
import { answerFlashcardsController } from "./features/flashcards/controllers/answer_flashcards_controller";
import { registerUserController } from "./features/user/controllers/register_user_controller";
import { loginUserController } from "./features/user/controllers/login_user_controller";
import { validateUserController } from "./features/user/controllers/validate_user_controller";
import jwt from "express-jwt";

const app = express();

app.use(express.json());
app.use(cors());

app.post(PATH.user.login, loginUserController);
app.post(PATH.user.register, registerUserController);
app.post(PATH.user.validate, validateUserController);

const flashcardsRouter = express.Router();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET not set");
  throw new Error("JWT_SECRET not set");
}
flashcardsRouter.use(
  jwt({ algorithms: ["HS256"], secret: process.env.JWT_SECRET })
);

// Note that this endpoint returns all flashcards and filtering is done on the client. We could actually
// just send the flashcards needed for review to improve performance. I don't have a strong opinion one
// way or the other as for small amounts of flashcards it probably doesn't matter much.
flashcardsRouter.get(
  PATH.flashcards.getFlashcards,
  getUserFlashcardsController
);

flashcardsRouter.post(
  PATH.flashcards.answerFlashcard,
  answerFlashcardsController
);

app.use(flashcardsRouter);

app.listen(process.env.PORT);

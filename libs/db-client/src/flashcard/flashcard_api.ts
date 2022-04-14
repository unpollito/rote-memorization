import { USER_ID } from "../constants/db_constants";
import { FlashcardWithUser } from "@shortform-flashcards/types";
import * as db from "zapatos/db";
import { flashcardDbToFlashcard } from "./flashcard_adapters";
import { getDbPool } from "../db/db_pool";

const getAllFlashcardsForUser = async (
  userId = USER_ID
): Promise<FlashcardWithUser[]> => {
  const flashcards = await db
    .select("flashcards", { user_id: userId })
    .run(getDbPool());
  return flashcards.map(flashcardDbToFlashcard);
};

export const flashcardApi = { getAllFlashcardsForUser };

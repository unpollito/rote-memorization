import { USER_ID } from "../constants/db_constants";
import { Flashcard, FlashcardWithUser } from "@shortform-flashcards/types";
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

const getFlashcard = async (
  flashcardId: string
): Promise<FlashcardWithUser | undefined> => {
  const flashcard = await db
    .selectOne("flashcards", { id: flashcardId })
    .run(getDbPool());
  return flashcard ? flashcardDbToFlashcard(flashcard) : undefined;
};

const updateFlashcard = async (flashcard: Flashcard): Promise<void> => {
  await db
    .update(
      "flashcards",
      {
        bin: flashcard.bin,
        last_answer_at: new Date().toISOString() as db.TimestampString,
        num_failed_answers: flashcard.numFailedAnswers,
      },
      {
        id: flashcard.id,
      }
    )
    .run(getDbPool());
};

export const flashcardApi = {
  getAllFlashcardsForUser,
  getFlashcard,
  updateFlashcard,
};

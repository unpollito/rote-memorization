import { FlashcardDb } from "./flashcard_db_types";
import { FlashcardWithUser } from "@rote-memorization/types";
import * as db from "zapatos/db";

export const flashcardDbToFlashcardWithUser = (
  flashcardDb: FlashcardDb
): FlashcardWithUser => ({
  id: flashcardDb.id,
  userId: flashcardDb.user_id,
  bin: flashcardDb.bin,
  lastAnswerAt: flashcardDb.last_answer_at ?? undefined,
  numFailedAnswers: flashcardDb.num_failed_answers,
  frontText: flashcardDb.front_text,
  backText: flashcardDb.back_text,
});

export const flashcardWithUserToFlashcardDb = (
  flashcard: FlashcardWithUser
): FlashcardDb => ({
  back_text: flashcard.backText,
  bin: flashcard.bin,
  front_text: flashcard.frontText,
  id: flashcard.id,
  // TODO: validate this
  last_answer_at: (flashcard.lastAnswerAt as db.TimestampString) ?? null,
  num_failed_answers: flashcard.numFailedAnswers,
  user_id: flashcard.userId,
});

import { FlashcardDb } from "./flashcard_db_types";
import { FlashcardWithUser } from "@shortform-flashcards/types";

export const flashcardDbToFlashcard = (
  flashcardDb: FlashcardDb
): FlashcardWithUser => ({
  id: flashcardDb.id,
  userId: flashcardDb.user_id,
  bin: flashcardDb.bin,
  numFailedAnswers: flashcardDb.num_failed_answers,
  frontText: flashcardDb.front_text,
  backText: flashcardDb.back_text,
});

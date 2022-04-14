import { Flashcard, FlashcardWithUser } from "../models/flashcard_types";

export const flashcardWithUserToFlashcard = (
  flashcard: FlashcardWithUser
): Flashcard => {
  // INTENDED: we want to ignore the userId
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, ...remainingFields } = flashcard;
  return remainingFields;
};

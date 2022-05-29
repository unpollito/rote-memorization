import { Flashcard } from "@rote-memorization/types";

export interface FlashcardDataForReviewSession {
  flashcardIdsReviewableInTheFuture: Set<string>;
  flashcardsToReviewNow: Flashcard[];
}

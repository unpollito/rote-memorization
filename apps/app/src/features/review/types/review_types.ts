import { Flashcard } from "@shortform-flashcards/types";

export interface FlashcardDataForReviewSession {
  flashcardIdsReviewableInTheFuture: Set<string>;
  flashcardsToReviewNow: Flashcard[];
}

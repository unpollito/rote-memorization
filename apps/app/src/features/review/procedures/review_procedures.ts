import { serviceApi } from "../../service/procedures/service_procedures";
import {
  getSortedFlashcardsForReview,
  isFlashcardReviewableNow,
  willFlashcardBeReviewable,
} from "@rote-memorization/flashcard-common";
import { FlashcardDataForReviewSession } from "../types/review_types";

export const getFlashcardDataForReviewSession = async (): Promise<FlashcardDataForReviewSession> => {
  const allFlashcards = await serviceApi.getFlashcards();
  return {
    flashcardIdsReviewableInTheFuture: new Set(
      allFlashcards
        .filter(willFlashcardBeReviewable)
        .map((flashcard) => flashcard.id)
    ),
    flashcardsToReviewNow: getSortedFlashcardsForReview(
      allFlashcards.filter(isFlashcardReviewableNow)
    ),
  };
};

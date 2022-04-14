import { Flashcard } from "@shortform-flashcards/types";
import { DateTime } from "luxon";
import {
  FLASHCARD_REVIEW_TIMES,
  MAX_INCORRECT_ANSWERS,
  NO_REVIEW_BIN,
} from "./flashcard_common_constants";

export const willFlashcardBeReviewable = (flashcard: Flashcard): boolean =>
  // Sanity check: NO_REVIEW_BIN might be undefined (shouldn't as per the definition, but just in case).
  // If that ever happens, assume that the flashcard can still be reviewed.
  (NO_REVIEW_BIN === undefined || flashcard.bin < NO_REVIEW_BIN) &&
  flashcard.numFailedAnswers < MAX_INCORRECT_ANSWERS;

export const isFlashcardReviewableNow = (flashcard: Flashcard): boolean => {
  if (!willFlashcardBeReviewable(flashcard)) {
    return false;
  }
  const now = DateTime.now();
  const reviewableFrom = getTimeForReview(flashcard);
  return reviewableFrom <= now;
};

export const getFlashcardAfterAnswer = ({
  flashcard,
  isCorrect,
}: {
  flashcard: Flashcard;
  isCorrect: boolean;
}): Flashcard => {
  if (isCorrect) {
    return {
      ...flashcard,
      bin: flashcard.bin + 1,
      lastAnswerAt: DateTime.now().toISO(),
    };
  } else {
    return {
      ...flashcard,
      bin: 1,
      lastAnswerAt: DateTime.now().toISO(),
      numFailedAnswers: flashcard.numFailedAnswers + 1,
    };
  }
};

export const getSortedFlashcardsForReview = (
  flashcards: Flashcard[]
): Flashcard[] => flashcards.sort((a, b) => (a.bin > b.bin ? -1 : 1));

const getTimeForReview = (flashcard: Flashcard): DateTime =>
  flashcard.lastAnswerAt
    ? DateTime.fromISO(flashcard.lastAnswerAt, {
        zone: "UTC",
      }).plus({
        seconds: FLASHCARD_REVIEW_TIMES[flashcard.bin] ?? 0,
      })
    : DateTime.fromISO("1970-01-01");

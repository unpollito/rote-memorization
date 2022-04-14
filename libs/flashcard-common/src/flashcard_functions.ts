import { Flashcard } from "@shortform-flashcards/types";
import { DateTime } from "luxon";
import {
  FLASHCARD_REVIEW_TIMES,
  MAX_INCORRECT_ANSWERS,
  NO_REVIEW_BIN,
} from "./flashcard_common_constants";

export const willFlashcardBeReviewable = (flashcard: Flashcard): boolean =>
  (NO_REVIEW_BIN === undefined || flashcard.bin < NO_REVIEW_BIN) &&
  flashcard.numFailedAnswers < MAX_INCORRECT_ANSWERS;

export const isFlashcardReviewableNow = (flashcard: Flashcard): boolean => {
  if (!willFlashcardBeReviewable(flashcard)) {
    return false;
  }
  if (!flashcard.lastAnswerAt) {
    return true;
  }
  const now = DateTime.now();
  const reviewableFrom = DateTime.fromISO(flashcard.lastAnswerAt).plus({
    seconds: FLASHCARD_REVIEW_TIMES[flashcard.bin] ?? 0,
  });
  return reviewableFrom > now;
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

import { Flashcard } from "@shortform-flashcards/types";

export interface ReviewMachineContext {
  flashcardIdsReviewableInTheFuture: Set<string>;
  remainingFlashcards: Flashcard[];
}

export type ReviewMachineEvent =
  | { type: "INIT" }
  | { type: "REVEAL_ANSWER" }
  | { isCorrect: boolean; type: "ANSWER" };

type ReviewMachineState =
  | "idle"
  | "loading"
  | "error"
  | "reviewingFront"
  | "reviewingBack"
  | "answering"
  | "complete";

export interface ReviewMachineTypeState {
  context: ReviewMachineContext;
  value: ReviewMachineState;
}

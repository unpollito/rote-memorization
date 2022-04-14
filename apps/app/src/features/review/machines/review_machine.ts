import { assign, createMachine, DoneInvokeEvent } from "xstate";
import { serviceApi } from "../../service/procedures/service_procedures";
import {
  ReviewMachineContext,
  ReviewMachineEvent,
  ReviewMachineTypeState,
} from "./review_machine_types";
import { getFlashcardDataForReviewSession } from "../procedures/review_procedures";
import { FlashcardDataForReviewSession } from "../types/review_types";
import {
  getFlashcardAfterAnswer,
  willFlashcardBeReviewable,
} from "@shortform-flashcards/flashcard-common";

export const reviewMachine = createMachine<
  ReviewMachineContext,
  ReviewMachineEvent,
  ReviewMachineTypeState
>(
  {
    id: "reviewMachine",
    initial: "idle",
    context: {
      flashcardIdsReviewableInTheFuture: new Set(),
      remainingFlashcards: [],
    },
    states: {
      idle: {
        on: {
          INIT: {
            target: "loading",
          },
        },
      },
      loading: {
        invoke: {
          src: "loadFlashcards",
          onDone: [
            {
              cond: (context, event) => event.data.length > 0,
              actions: ["assignFlashcardsAfterLoad"],
              target: "reviewingFront",
            },
            {
              actions: ["assignFlashcardsAfterLoad"],
              target: "complete",
            },
          ],
          onError: {
            actions: ["onError"],
            target: "error",
          },
        },
      },
      error: {
        type: "final",
      },
      reviewingFront: {
        on: {
          REVEAL_ANSWER: {
            target: "reviewingBack",
          },
        },
      },
      reviewingBack: {
        on: {
          ANSWER: {
            target: "answering",
          },
        },
      },
      answering: {
        invoke: {
          src: "answerFlashcard",
          onDone: [
            {
              cond: (context) => context.remainingFlashcards.length > 1,
              actions: ["markFlashcardAsAnswered"],
              target: "reviewingFront",
            },
            {
              actions: ["markFlashcardAsAnswered"],
              target: "complete",
            },
          ],
          onError: {
            actions: ["onError"],
            target: "error",
          },
        },
      },
      complete: {
        type: "final",
      },
    },
  },
  {
    actions: {
      assignFlashcardsAfterLoad: (_, event) => {
        // Not a fan of needing to do this, but XState's typing is not really well done.
        const {
          flashcardIdsReviewableInTheFuture,
          flashcardsToReviewNow,
        } = (event as DoneInvokeEvent<FlashcardDataForReviewSession>).data;
        return assign({
          flashcardIdsReviewableInTheFuture,
          remainingFlashcards: flashcardsToReviewNow,
        });
      },

      markFlashcardAsAnswered: assign({
        flashcardIdsReviewableInTheFuture: (context, event) => {
          if (event.type !== "ANSWER") {
            throw new Error("Wrong event type");
          }
          if (event.isCorrect) {
            return context.flashcardIdsReviewableInTheFuture;
          }
          const flashcard = context.remainingFlashcards[0];
          const answeredFlashcard = getFlashcardAfterAnswer({
            flashcard,
            isCorrect: event.isCorrect,
          });
          if (willFlashcardBeReviewable(answeredFlashcard)) {
            return context.flashcardIdsReviewableInTheFuture;
          }
          const newSet = new Set(...context.flashcardIdsReviewableInTheFuture);
          newSet.delete(flashcard.id);
          return newSet;
        },

        remainingFlashcards: (context) => context.remainingFlashcards.slice(1),
      }),

      onError: (context, event) => {
        console.error("Error in state machine");
        console.log(event);
        console.log(context);
      },
    },
    services: {
      answerFlashcard: (context, event) => {
        if (event.type === "ANSWER") {
          return serviceApi.answerFlashcard({
            flashcard: context.remainingFlashcards[0],
            isCorrect: event.isCorrect,
          });
        }
        throw new Error("Incorrect event type");
      },
      loadFlashcards: getFlashcardDataForReviewSession,
    },
  }
);

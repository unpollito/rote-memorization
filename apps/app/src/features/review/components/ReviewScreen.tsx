import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../navigation/navigation_constants";
import { useMachine } from "@xstate/react";
import { reviewMachine } from "../machines/review_machine";
import { useEffect } from "react";
import { ReviewScreenLoadingView } from "./ReviewScreenLoadingView";
import { ReviewScreenFlashcardFrontView } from "./ReviewScreenFlashcardFrontView";
import { ReviewScreenFlashcardBackView } from "./ReviewScreenFlashcardBackView";
import { ReviewScreenErrorView } from "./ReviewScreenErrorView";
import { ReviewScreenCompleteView } from "./ReviewScreenCompleteView";

export const ReviewScreen = (): React.ReactElement => {
  const [state, send] = useMachine(reviewMachine);

  useEffect(() => {
    send({ type: "INIT" });
  }, [send]);

  const currentFlashcard = state.context.remainingFlashcards[0];

  return (
    <div>
      <h2>Review session</h2>
      {state.matches("idle") || state.matches("loading") ? (
        <ReviewScreenLoadingView />
      ) : undefined}
      {state.matches("reviewingFront") && currentFlashcard ? (
        <ReviewScreenFlashcardFrontView
          flashcard={currentFlashcard}
          onRevealAnswer={() => send({ type: "REVEAL_ANSWER" })}
        />
      ) : undefined}
      {(state.matches("reviewingBack") || state.matches("answering")) &&
      currentFlashcard ? (
        <ReviewScreenFlashcardBackView
          flashcard={currentFlashcard}
          isAnswering={state.matches("answering")}
          onCorrectAnswer={() => send({ isCorrect: true, type: "ANSWER" })}
          onIncorrectAnswer={() => send({ isCorrect: false, type: "ANSWER" })}
        />
      ) : undefined}
      {state.matches("complete") ? (
        <ReviewScreenCompleteView
          hasFlashcardsLeft={
            state.context.flashcardIdsReviewableInTheFuture.size > 0
          }
        />
      ) : undefined}
      {state.matches("error") ? <ReviewScreenErrorView /> : undefined}
      <p>
        <Link to={APP_ROUTES.HOME}>Back</Link>
      </p>
    </div>
  );
};

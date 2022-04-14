import React from "react";
import { Flashcard } from "@shortform-flashcards/types";

export const ReviewScreenFlashcardBackView = ({
  flashcard,
  isAnswering,
  onCorrectAnswer,
  onIncorrectAnswer,
}: {
  flashcard: Flashcard;
  isAnswering: boolean;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}): React.ReactElement => (
  <div>
    <p>{flashcard.frontText}</p>
    <p>{flashcard.backText}</p>
    <button onClick={onCorrectAnswer} disabled={isAnswering}>
      I got it
    </button>
    <button onClick={onIncorrectAnswer} disabled={isAnswering}>
      I did not get it
    </button>
  </div>
);

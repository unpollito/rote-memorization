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
    <div className="buttons">
      <button
        className="buttons_button--correct"
        onClick={onCorrectAnswer}
        disabled={isAnswering}
      >
        I got it
      </button>
      <button
        className="buttons_button--incorrect"
        onClick={onIncorrectAnswer}
        disabled={isAnswering}
      >
        I did not get it
      </button>
    </div>
  </div>
);

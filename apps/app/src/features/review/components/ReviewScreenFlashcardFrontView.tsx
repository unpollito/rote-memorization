import React from "react";
import { Flashcard } from "@shortform-flashcards/types";

export const ReviewScreenFlashcardFrontView = ({
  flashcard,
  onRevealAnswer,
}: {
  flashcard: Flashcard;
  onRevealAnswer: () => void;
}): React.ReactElement => (
  <div>
    <h3>What's this?</h3>
    <p>{flashcard.frontText}</p>
    <button onClick={onRevealAnswer}>Show definition</button>
  </div>
);

import React from "react";
import { Flashcard } from "@rote-memorization/types";
import "./ReviewScreen.css";

export const ReviewScreenFlashcardFrontView = ({
  flashcard,
  onRevealAnswer,
}: {
  flashcard: Flashcard;
  onRevealAnswer: () => void;
}): React.ReactElement => (
  <div>
    <h4>What's this?</h4>
    <p>{flashcard.frontText}</p>
    <button className="button--show-definition" onClick={onRevealAnswer}>
      Show definition
    </button>
  </div>
);

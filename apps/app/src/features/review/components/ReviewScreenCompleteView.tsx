import React from "react";

export const ReviewScreenCompleteView = ({
  hasFlashcardsLeft,
}: {
  hasFlashcardsLeft: boolean;
}): React.ReactElement => (
  <p>
    {hasFlashcardsLeft
      ? "You are temporarily done; please come back later to review more words"
      : "You have no more words to review; you are permanently done!"}
  </p>
);

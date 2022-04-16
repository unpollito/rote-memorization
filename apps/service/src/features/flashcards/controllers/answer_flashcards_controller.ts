import { Response } from "express";
import { db } from "@shortform-flashcards/db-client";
import { getFlashcardAfterAnswer } from "@shortform-flashcards/flashcard-common";
import { RequestWithJwt } from "../../../common/service_common_types";

export const answerFlashcardsController = async (
  req: RequestWithJwt,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const isCorrect = req.body.isCorrect;
  if (!id || typeof isCorrect !== "boolean") {
    return res.status(400).send("");
  }
  const flashcard = await db.flashcard.getFlashcard(id);
  if (!flashcard || flashcard.userId !== req.user.id) {
    return res.status(404).send("");
  }

  const updatedFlashcard = getFlashcardAfterAnswer({ flashcard, isCorrect });
  await db.flashcard.updateFlashcard(updatedFlashcard);
  return res.status(200).send("");
};

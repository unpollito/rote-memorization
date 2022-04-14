import { Request, Response } from "express";
import { db } from "@shortform-flashcards/db-client";
import { getFlashcardAfterAnswer } from "@shortform-flashcards/flashcard-common";

export const answerFlashcardsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const isCorrect = req.body.isCorrect;
  if (!id || typeof isCorrect !== "boolean") {
    return res.status(400).send("");
  }
  // TODO: verify that the flashcard belongs to the current user
  const flashcard = await db.flashcard.getFlashcard(id);
  if (!flashcard) {
    return res.status(404).send("");
  }

  const updatedFlashcard = getFlashcardAfterAnswer({ flashcard, isCorrect });
  await db.flashcard.updateFlashcard(updatedFlashcard);
  return res.status(200).send("");
};

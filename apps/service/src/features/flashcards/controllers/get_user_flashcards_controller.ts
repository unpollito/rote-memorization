import { Request, Response } from "express";
import { db } from "@shortform-flashcards/db-client";
import { flashcardWithUserToFlashcard } from "@shortform-flashcards/types";

export const getUserFlashcardsController = async (
  _: Request,
  res: Response
): Promise<void> => {
  const flashcards = await db.flashcard.getAllFlashcardsForUser();
  res.send(JSON.stringify(flashcards.map(flashcardWithUserToFlashcard)));
};

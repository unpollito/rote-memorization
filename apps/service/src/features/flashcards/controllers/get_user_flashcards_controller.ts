import { Response } from "express";
import { db } from "@shortform-flashcards/db-client";
import { flashcardWithUserToFlashcard } from "@shortform-flashcards/types";
import { RequestWithJwt } from "../../../common/service_common_types";

export const getUserFlashcardsController = async (
  req: RequestWithJwt,
  res: Response
): Promise<void> => {
  const flashcards = await db.flashcard.getAllFlashcardsForUser(req.user.id);
  res.send(JSON.stringify(flashcards.map(flashcardWithUserToFlashcard)));
};

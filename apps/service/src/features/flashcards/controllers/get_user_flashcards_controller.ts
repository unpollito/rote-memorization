import { Request, Response } from "express";
import { db } from "@rote-memorization/db-client";
import { flashcardWithUserToFlashcard } from "@rote-memorization/types";
import { getUserFromRequest } from "../../../common/service_common_types";

export const getUserFlashcardsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const flashcards = await db.flashcard.getAllFlashcardsForUser(
    getUserFromRequest(req).id
  );
  res.send(JSON.stringify(flashcards.map(flashcardWithUserToFlashcard)));
};

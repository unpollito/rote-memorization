import { Request, Response } from "express";
import { db } from "@shortform-flashcards/db-client";
import {
  createUser,
  sendValidationEmailToUser,
} from "../procedures/user_registration_procedures";
import { populateUserFlashcards } from "../../flashcards/procedures/flashcards_procedures";

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const email = req.body.email;
  const rawPassword = req.body.password;

  if (typeof email !== "string" || typeof rawPassword !== "string") {
    return res.status(400).send("Missing email or password");
  }

  const existingUser = await db.user.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).send("User exists already");
  }

  try {
    const user = await createUser({ email, rawPassword });
    await sendValidationEmailToUser(user);
    await populateUserFlashcards(user);
    return res.status(201).send("");
  } catch (e) {
    console.error(e);
    return res.status(500).send("");
  }
};

import { Request, Response } from "express";
import { db } from "@shortform-flashcards/db-client";
import { generateJwt } from "../procedures/user_login_procedures";

export const validateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const key = req.body.key;

  if (typeof key !== "string") {
    return res.status(400).send({ reason: "Missing key" });
  }

  try {
    const validationData = await db.user.getUserValidationEmailDataByKey(key);
    if (!validationData) {
      return res.status(400).send({ reason: "Key not found" });
    }
    const updatedUser = {
      ...validationData.user,
      isActive: true,
    };
    await db.user.updateUser(updatedUser);

    return res.status(200).send(generateJwt(updatedUser));
  } catch (e) {
    console.error(e);
    return res.status(500).send("");
  }
};

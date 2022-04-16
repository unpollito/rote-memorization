import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { db } from "@shortform-flashcards/db-client";
import { generateJwt } from "../procedures/user_login_procedures";

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const email = req.body.email;
  const rawPassword = req.body.password;

  if (typeof email !== "string" || typeof rawPassword !== "string") {
    return res.status(400).send({ reason: "Missing email or password" });
  }

  try {
    const user = await db.user.getUserByEmail(email);
    if (!user) {
      return res.status(403).send({ reason: "Bad credentials" });
    } else if (!user.isActive) {
      return res
        .status(403)
        .send({ isInactive: true, reason: "Not activated" });
    }

    const isCorrectPassword = await bcrypt.compare(rawPassword, user.password);
    if (!isCorrectPassword) {
      return res.status(403).send({ reason: "Bad credentials" });
    }

    return res.status(200).send(generateJwt(user));
  } catch (e) {
    console.error(e);
    return res.status(500).send("");
  }
};

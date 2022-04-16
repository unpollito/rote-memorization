import { User } from "@shortform-flashcards/types";
import jwt from "jsonwebtoken";

export const generateJwt = (user: User): string => {
  if (typeof process.env.JWT_SECRET !== "string") {
    throw new Error("JWT_SECRET not set");
  }

  return jwt.sign(
    { email: user.email, id: user.id, isActive: user.isActive },
    process.env.JWT_SECRET,
    { algorithm: "HS256" }
  );
};

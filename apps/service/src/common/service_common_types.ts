import { Request } from "express";
import { User } from "@shortform-flashcards/types";

export interface RequestWithJwt extends Request {
  user: User;
}

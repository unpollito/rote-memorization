import { Request } from "express";
import { User } from "@rote-memorization/types";

export const getUserFromRequest = (request: Request): User => {
  if (!request.user || !(request.user as User).id) {
    throw new Error("Request user not set");
  }
  // Ideally we should validate this, but it is a bit overkill for now as only us
  // can provide valid JWTs, so we have a guarantee that we'll only find complete
  // users in there.
  return request.user as User;
};

import { UserDb, UserValidationEmailDb } from "./user_db_types";
import {
  UserValidationEmailData,
  UserWithPassword,
} from "@rote-memorization/types";

export const userDbToUserWithPassword = (userDb: UserDb): UserWithPassword => ({
  email: userDb.email,
  id: userDb.id,
  isActive: userDb.is_active,
  password: userDb.password,
});

export const userWithPasswordToUserDb = (user: UserWithPassword): UserDb => ({
  email: user.email,
  id: user.id,
  is_active: user.isActive,
  password: user.password,
});

export const userValidationDbToUserValidationEmailData = (
  emailData: UserValidationEmailDb
): UserValidationEmailData => ({
  key: emailData.key,
  sentAt: emailData.sent_at,
});

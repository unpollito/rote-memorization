import {
  UserValidationEmailData,
  UserWithPassword,
} from "@shortform-flashcards/types";
import * as db from "zapatos/db";
import { getDbPool } from "../db/db_pool";
import {
  userDbToUser,
  userToUserDb,
  userValidationDbToUserValidationEmailData,
} from "./user_adapters";

const createUser = async (user: UserWithPassword): Promise<void> => {
  await db.insert("users", userToUserDb(user)).run(getDbPool());
};

const createUserValidationEmailData = async ({
  emailData,
  userId,
}: {
  emailData: UserValidationEmailData;
  userId: string;
}): Promise<void> => {
  await db
    .insert("user_validation_emails", [
      {
        key: emailData.key,
        // TODO: validate
        sent_at: emailData.sentAt as db.TimestampString,
        user_id: userId,
      },
    ])
    .run(getDbPool());
};

const deleteUserValidationEmailData = async (userId: string): Promise<void> => {
  await db
    .deletes("user_validation_emails", { user_id: userId })
    .run(getDbPool());
};

const getUserByEmail = async (
  email: string
): Promise<UserWithPassword | undefined> => {
  const user = await db.selectOne("users", { email }).run(getDbPool());
  return user ? userDbToUser(user) : undefined;
};

const getUserValidationEmailDataByKey = async (
  key: string
): Promise<UserValidationEmailData | undefined> => {
  const emailData = await db
    .selectOne("user_validation_emails", { key })
    .run(getDbPool());
  return emailData
    ? userValidationDbToUserValidationEmailData(emailData)
    : undefined;
};

export const userApi = {
  createUser,
  createUserValidationEmailData,
  deleteUserValidationEmailData,
  getUserByEmail,
  getUserValidationEmailDataByKey,
};

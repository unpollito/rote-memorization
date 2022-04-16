import {
  User,
  UserValidationEmailData,
  UserValidationEmailDataWithUserWithPassword,
  UserWithPassword,
} from "@shortform-flashcards/types";
import * as db from "zapatos/db";
import { getDbPool } from "../db/db_pool";
import {
  userDbToUserWithPassword,
  userValidationDbToUserValidationEmailData,
  userWithPasswordToUserDb,
} from "./user_adapters";

const createUser = async (user: UserWithPassword): Promise<void> => {
  await db.insert("users", userWithPasswordToUserDb(user)).run(getDbPool());
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
  return user ? userDbToUserWithPassword(user) : undefined;
};

const getUserById = async (
  id: string
): Promise<UserWithPassword | undefined> => {
  const user = await db.selectOne("users", { id }).run(getDbPool());
  return user ? userDbToUserWithPassword(user) : undefined;
};

const getUserValidationEmailDataByKey = async (
  key: string
): Promise<UserValidationEmailDataWithUserWithPassword | undefined> => {
  const emailData = await db
    .selectOne(
      "user_validation_emails",
      { key },
      {
        lateral: {
          user: db.selectOne("users", {
            id: db.parent("user_id"),
          }),
        },
      }
    )
    .run(getDbPool());
  return emailData && emailData.user
    ? {
        ...userValidationDbToUserValidationEmailData(emailData),
        user: userDbToUserWithPassword(emailData.user),
      }
    : undefined;
};

const updateUser = async (user: User): Promise<void> => {
  await db
    .update(
      "users",
      { email: user.email, is_active: user.isActive },
      { id: user.id }
    )
    .run(getDbPool());
};

export const userApi = {
  createUser,
  createUserValidationEmailData,
  deleteUserValidationEmailData,
  getUserByEmail,
  getUserById,
  getUserValidationEmailDataByKey,
  updateUser,
};

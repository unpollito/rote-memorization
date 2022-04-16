import { UserWithPassword } from "@shortform-flashcards/types";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { db } from "@shortform-flashcards/db-client";
import { sendEmail } from "../../email/procedures/email_procedures";

export const createUser = async ({
  email,
  rawPassword,
}: {
  email: string;
  rawPassword: string;
}): Promise<UserWithPassword> => {
  const id = uuidv4();
  const password = await bcrypt.hash(rawPassword, 10);
  const user = {
    email,
    id,
    isActive: false,
    password,
  };
  await db.user.createUser(user);
  return user;
};

export const sendValidationEmailToUser = async (
  user: UserWithPassword
): Promise<void> => {
  const key = crypto.randomBytes(48).toString("hex");
  await db.user.createUserValidationEmailData({
    emailData: {
      key,
      sentAt: new Date().toISOString(),
    },
    userId: user.id,
  });

  const validationUrl = `${process.env.WEBSITE_URL}/validate/${key}`;
  await sendEmail({
    html: `<p>To validate your email address, open <a href="${validationUrl}">${validationUrl}</a> within the next 60 minutes.</p>`,
    subject: "Validate your email address",
    text: `To validate your email address, open ${validationUrl} within the next 60 minutes.`,
    to: user.email,
  });
};

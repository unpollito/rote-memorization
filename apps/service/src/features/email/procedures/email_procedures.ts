import nodemailer from "nodemailer";

// I wanted to go with AWS SES, but I'd have needed to jump through some hoops for that as AWS
// puts the email in sandbox mode first and getting out of there requires some manual validation
// which might be turned down for a personal email address, so I went with good old SMTP instead.
export const sendEmail = async ({
  html,
  subject,
  text,
  to,
}: {
  html: string;
  subject: string;
  text: string;
  to: string;
}): Promise<void> => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "", 10);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (
    typeof host !== "string" ||
    Number.isNaN(port) ||
    typeof user !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error("Missing required env vars");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass: password,
    },
  });

  await transporter.sendMail({
    from: user,
    html,
    subject,
    text,
    to,
  });
};

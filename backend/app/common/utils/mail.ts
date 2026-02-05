import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: ENV.EMAIL_SERVICE,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS
  }
});

export const sendMail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  await transporter.sendMail({
    from: `"${ENV.APP_NAME}" <${ENV.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};

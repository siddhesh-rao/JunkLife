import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter =
  env.smtpUser && env.smtpPass
    ? nodemailer.createTransport({
        host: env.smtpHost,
        port: env.smtpPort,
        secure: false,
        auth: { user: env.smtpUser, pass: env.smtpPass }
      })
    : null;

export const sendEmail = async ({ to, subject, html }) => {
  if (!transporter || !to) {
    return;
  }

  await transporter.sendMail({
    from: env.mailFrom,
    to,
    subject,
    html
  });
};

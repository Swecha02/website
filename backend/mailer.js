import nodemailer from 'nodemailer';
import 'dotenv/config';

// Uses any SMTP account - Hostinger email, Gmail with an app password, etc.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendNotificationEmail({ subject, text, html }) {
  if (!process.env.SMTP_HOST) {
    console.warn('SMTP not configured - skipping email notification:', subject);
    return;
  }

  const retryDelays = [600, 1200]; // handles Resend's 2 req/sec burst limit
  for (let attempt = 0; ; attempt++) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.NOTIFY_TO || process.env.SMTP_USER,
        subject,
        text,
        html,
      });
      return;
    } catch (err) {
      if (attempt >= retryDelays.length) {
        // Never let a failed email break the form submission -
        // the DB row is already saved by the time this runs.
        console.error('Email notification failed:', err.message);
        return;
      }
      await sleep(retryDelays[attempt]);
    }
  }
}

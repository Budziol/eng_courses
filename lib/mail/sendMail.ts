"use server";

import { transporter } from "./transporter";
import type { SendMailOptions } from "./types";

export async function sendMail({ to, subject, html, text }: SendMailOptions) {
  await transporter.sendMail({
    from: `"SPEAKT" <${process.env.GOOGLE_EMAIL_USER}>`,
    to,
    subject,
    html,
    text,
  });
}

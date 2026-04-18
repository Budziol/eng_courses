"use server";

import { sendMail } from "@/lib/mail/sendMail";
import { contactTemplate } from "@/lib/mail/templates/contact";
import { contactSchema } from "@/lib/validators/contact";

export type ContactFormState = {
  success?: boolean;
  errors?: Record<string, string>;
};

export async function sendContactMail(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    const rawData = Object.fromEntries(formData) as Record<string, string>;

    const result = contactSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });

      return { errors: fieldErrors };
    }

    const { name, email, message } = result.data;

    const template = contactTemplate({ name, email, message });

    await sendMail({
      to: process.env.EMAIL_TO as string,
      ...template,
    });

    return { success: true };
  } catch (e) {
    console.error(e);
    return {
      errors: {
        form: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
      },
    };
  }
}

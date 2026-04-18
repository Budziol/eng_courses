import { z } from "zod";

export const contactHints = {
  name: "Podaj swoje imię (min. 2 znaki)",
  email: "Podaj poprawny adres email",
  message: "Wiadomość musi mieć min. 10 znaków",
};

export const contactSchema = z.object({
  name: z.string().min(2, contactHints.name),
  email: z.email(contactHints.email),
  message: z.string().min(10, contactHints.message),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

import { z } from "zod";

export const emailConstraints = {
  format: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Wprowadź poprawny format email",
  },
};

export const passwordConstraints = {
  minLength: {
    value: 8,
    message: "Minimum 8 znaków",
  },
  hasUppercase: {
    regex: /[A-Z]/,
    message: "Jedna wielka litera",
  },
  hasDigit: {
    regex: /\d/,
    message: "Jedna cyfra",
  },
};

export const loginSchema = z.object({
  email: z
    .string()
    .regex(emailConstraints.format.regex, emailConstraints.format.message),

  password: z
    .string()
    .min(
      passwordConstraints.minLength.value,
      passwordConstraints.minLength.message,
    )
    .regex(
      passwordConstraints.hasUppercase.regex,
      passwordConstraints.hasUppercase.message,
    )
    .regex(
      passwordConstraints.hasDigit.regex,
      passwordConstraints.hasDigit.message,
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const emailRules = [
  {
    id: "format",
    test: (v: string) => emailConstraints.format.regex.test(v),
    label: emailConstraints.format.message,
  },
];

export const passwordRules = [
  {
    id: "min",
    test: (v: string) => v.length >= passwordConstraints.minLength.value,
    label: passwordConstraints.minLength.message,
  },
  {
    id: "upper",
    test: (v: string) => passwordConstraints.hasUppercase.regex.test(v),
    label: passwordConstraints.hasUppercase.message,
  },
  {
    id: "digit",
    test: (v: string) => passwordConstraints.hasDigit.regex.test(v),
    label: passwordConstraints.hasDigit.message,
  },
];

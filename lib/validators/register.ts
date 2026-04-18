import { z } from "zod";

export const nameConstraints = {
  minLength: {
    value: 1,
    message: "Pole nie może być puste",
  },
};

export const lastNameConstraints = {
  minLength: {
    value: 1,
    message: "Pole nie może być puste",
  },
};

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

export const registerSchema = z.object({
  name: z
    .string()
    .min(nameConstraints.minLength.value, nameConstraints.minLength.message),
  lastName: z
    .string()
    .min(
      lastNameConstraints.minLength.value,
      lastNameConstraints.minLength.message,
    ),
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

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const nameRules = [
  {
    id: "min",
    test: (v: string) => v.length >= nameConstraints.minLength.value,
    label: nameConstraints.minLength.message,
  },
];

export const lastNameRules = [
  {
    id: "min",
    test: (v: string) => v.length >= lastNameConstraints.minLength.value,
    label: lastNameConstraints.minLength.message,
  },
];

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

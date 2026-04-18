import z from "zod";

export const activationSchema = z.object({
  code: z.string().length(5, "Niepoprawny kod"),
});

export type ActivationFormValues = z.infer<typeof activationSchema>;

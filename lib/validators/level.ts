import z from "zod";
import { Lvl } from "../generated/prisma/enums";

export const levelSchema = z.object({
  speaking: z.coerce
    .number()
    .min(0, { message: "Minimalna wartość to 0" })
    .max(100, { message: "Maksymalna wartość to 100" }),
  listening: z.coerce
    .number()
    .min(0, { message: "Minimalna wartość to 0" })
    .max(100, { message: "Maksymalna wartość to 100" }),
  reading: z.coerce
    .number()
    .min(0, { message: "Minimalna wartość to 0" })
    .max(100, { message: "Maksymalna wartość to 100" }),
  writing: z.coerce
    .number()
    .min(0, { message: "Minimalna wartość to 0" })
    .max(100, { message: "Maksymalna wartość to 100" }),
  level: z.enum(Lvl, {
    message: "Niepoprawny status spotkania",
  }),
});

export type LevelFormValues = z.infer<typeof levelSchema>;

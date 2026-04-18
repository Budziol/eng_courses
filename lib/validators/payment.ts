import z from "zod";

export const paymentSchema = z
  .object({
    paidAt: z.coerce.date({
      message: "Niepoprawna data początkowa",
    }),
    paidTo: z.coerce.date({
      message: "Niepoprawna data końcowa",
    }),
  })
  .refine((data) => data.paidTo >= data.paidAt, {
    message: "Data końcowa nie może być wcześniejsza niż początkowa",
    path: ["paidTo"],
  });

export type PaymentFormValues = z.infer<typeof paymentSchema>;

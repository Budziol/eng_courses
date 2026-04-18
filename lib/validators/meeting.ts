import { MeetingStatus } from "@prisma/client";
import z from "zod";

export const meetingSchema = z.object({
  date: z.coerce.date({
    message: "Niepoprawna data początkowa",
  }),
  link: z.string().min(5, "Link musi mieć minimum 5 znaków"),
  status: z.enum(MeetingStatus, {
    message: "Niepoprawny status spotkania",
  }),
});

export type MeetingFormValues = z.infer<typeof meetingSchema>;

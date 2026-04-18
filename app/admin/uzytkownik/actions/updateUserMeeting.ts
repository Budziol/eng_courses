"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { meetingSchema } from "@/lib/validators/meeting";
import { updateTag } from "next/cache";
import z from "zod";

export type UpdateUserMeetingState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
};

export const updateUserMeeting = async (
  prevState: UpdateUserMeetingState,
  formData: FormData,
) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  const result = meetingSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      message: "",
      fieldErrors: errors.fieldErrors,
      formErrors: errors.formErrors,
    };
  }

  const targetMeetingId = formData.get("meetingId") as string;

  const { date, link, status } = result.data;

  const updated = await prisma.meeting.update({
    where: { id: targetMeetingId },
    data: { date: date, link: link, status: status },
  });

  if (!updated) {
    return {
      success: false,
      message:
        "Nie udalo się zaktualizować wybranego spotkania. Spróbuj ponownie później.",
    };
  }

  updateTag(`meetings-list`);

  return { success: true, message: "" };
};

"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { meetingSchema } from "@/lib/validators/meeting";
import { MeetingStatus } from "@prisma/client";
import { updateTag } from "next/cache";
import z from "zod";

export type AddUserMeetingState = {
  success: boolean;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
};

export const addUserMeeting = async (prevState: any, formData: FormData) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  const result = meetingSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      fieldErrors: errors.fieldErrors,
      formErrors: errors.formErrors,
    };
  }

  const targetUserId = formData.get("userId") as string;

  const { date, link, status } = result.data;

  try {
    await prisma.meeting.create({
      data: {
        userId: targetUserId,
        date: new Date(date),
        link: link,
        status: status as MeetingStatus,
      },
    });

    updateTag(`meetings-list`);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Błąd bazy danych" };
  }
};

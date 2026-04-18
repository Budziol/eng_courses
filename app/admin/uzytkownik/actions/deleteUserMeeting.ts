"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

type Props = {
  prevState: DeleteUserMeetingState;
  meetingId: string;
};

export type DeleteUserMeetingState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
};

export const deleteUserMeeting = async (
  prevState: DeleteUserMeetingState,
  meetingId: string,
) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  const deleted = await prisma.meeting.delete({
    where: {
      id: meetingId,
    },
  });

  if (!deleted) {
    return {
      success: false,
      message:
        "Nie udalo się usunąć wybranej płatności. Spróbuj ponownie później.",
    };
  }

  updateTag(`meetings-list`);

  return {
    success: true,
    message: "",
  };
};

"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";

export const getLatestMeeting = async (userId: string) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  if (!userId) {
    throw new Error("Brak userId");
  }

  const meetings = await prisma.meeting.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!meetings) {
    return null;
  }

  return meetings;
};

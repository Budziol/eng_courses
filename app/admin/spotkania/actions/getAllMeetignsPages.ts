import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { getMeetingSearch } from "@/lib/search";

export const getAllMeetingsPages = async (
  search: string,
  limit: number = 10,
) => {
  const admin = await getCurrentUser();

  if (!admin) {
    throw new Error("Nieautoryzowany");
  }

  const where = getMeetingSearch(search);

  const count = await prisma.meeting.count({ where });

  return { totalPages: Math.ceil(count / limit) };
};

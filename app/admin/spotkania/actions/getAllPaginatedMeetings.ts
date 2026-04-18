import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { getMeetingSearch } from "@/lib/search";
import { Prisma } from "@prisma/client";

export type MeetingsWithUser = Prisma.MeetingGetPayload<{
  include: { user: true };
}>;

export type PaginatedResult<T> = {
  data: T[];
  page: number;
};

export const getAllPaginatedMeetings = async (
  page = 1,
  search = "",
  limit = 10,
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Nieautoryzowany");
  }

  const skip = (page - 1) * limit;

  const where = getMeetingSearch(search);

  const data = await prisma.meeting.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return {
    data,
    page,
  } as PaginatedResult<MeetingsWithUser>;
};

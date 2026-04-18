"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { Meeting, Payment } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type Props = {
  userId: string;
  page: number;
  limit: number;
};

export type PaginatedResult<T> = {
  meetings: T[];
  page: number;
  totalPages: number;
};

const getCachedPaginatedMeetings = unstable_cache(
  async (userId: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const [total, meetings] = await prisma.$transaction([
      prisma.meeting.count({ where: { userId } }),
      prisma.meeting.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return { total, meetings };
  },
  ["meetings-list"],
  {
    tags: ["meetings-list"],
    revalidate: 3600,
  },
);

export const getPaginatedMeetings = async ({
  userId,
  page = 1,
  limit = 10,
}: Props) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  const { total, meetings } = await getCachedPaginatedMeetings(
    userId,
    page,
    limit,
  );

  return {
    meetings,
    page,
    totalPages: Math.ceil(total / limit),
  } as PaginatedResult<Meeting>;
};

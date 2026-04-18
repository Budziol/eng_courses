import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function getMeetingsPaginated(
  page = 1,
  limit = 10,
  userId: string,
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Nieautoryzowany");
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const skip = (page - 1) * limit;

  const [total, data] = await prisma.$transaction([
    prisma.meeting.count(),
    prisma.meeting.findMany({
      where: { userId: userId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  } as PaginatedResult<(typeof data)[number]>;
}

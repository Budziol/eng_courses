"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { Payment, Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type Props = {
  userId: string;
  page: number;
  limit: number;
};

export type PaginatedResult<T> = {
  payments: T[];
  page: number;
  totalPages: number;
};

const getCachedPaginatedPayments = unstable_cache(
  async (userId: string, page: number, limit: number) => {
    const safePage = Math.max(1, page);
    const skip = (safePage - 1) * limit;

    const [total, payments] = await prisma.$transaction([
      prisma.payment.count({
        where: { userId },
      }),
      prisma.payment.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return { total, payments };
  },
  ["payments-list"],
  {
    tags: ["payments-list"],
    revalidate: 3600,
  },
);

export const getPaginatedPayments = async ({
  userId,
  page = 1,
  limit = 10,
}: Props) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  const { total, payments } = await getCachedPaginatedPayments(
    userId,
    page,
    limit,
  );

  return {
    payments,
    page,
    totalPages: Math.ceil(total / limit),
  } as PaginatedResult<Payment>;
};

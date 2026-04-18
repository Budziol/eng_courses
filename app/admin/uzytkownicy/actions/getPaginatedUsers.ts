"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { Prisma } from "@prisma/client";

export type UserWithPayments = Prisma.UserGetPayload<{
  include: { payments: true };
}>;

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const getPaginatedUsersCached = async (
  page: number,
  limit: number,
  search: string,
) =>
  unstable_cache(
    async () => {
      const skip = (page - 1) * limit;

      const where = search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                email: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {};

      const [total, data] = await prisma.$transaction([
        prisma.user.count({ where }),

        prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            payments: {
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
          },
        }),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      return { total, data };
    },
    ["users-list", page.toString(), search],
    { tags: [`users-list`], revalidate: 3600 },
  )();

export const getPaginatedUsers = cache(
  async (page = 1, limit = 10, search = "") => {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      throw new Error("Nieautoryzowany");
    }

    const { total, data } = await getPaginatedUsersCached(page, limit, search);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    } as PaginatedResult<UserWithPayments>;
  },
);

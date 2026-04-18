"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCachedUserLevel = (userId: string) =>
  unstable_cache(
    async () => {
      return prisma.level.findFirst({
        where: { userId },
      });
    },
    [`user-level-${userId}`],
    {
      tags: [`level-${userId}`],
    },
  )();

export const getUserLevel = async (userId: string) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  try {
    const level = await getCachedUserLevel(userId);

    return { level };
  } catch (error) {
    console.log(error);
    return { level: null };
  }
};

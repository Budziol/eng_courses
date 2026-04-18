"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";

export const getUserTest = async (userId: string) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  try {
    const test = await prisma.test.findFirst({
      where: { userId },
      include: {
        answers: {
          include: {
            question: true,
            option: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { test };
  } catch (error) {
    console.log(error);
    return { test: null };
  }
};

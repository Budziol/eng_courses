import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaymentsSearch } from "@/lib/search";

export const getAllPaymentsPages = async (
  search: string,
  limit: number = 10,
) => {
  const admin = await getCurrentUser();

  if (!admin) {
    throw new Error("Nieautoryzowany");
  }

  const where = getPaymentsSearch(search);

  const count = await prisma.payment.count({ where });

  return { totalPages: Math.ceil(count / limit) };
};

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getPaymentsSearch } from "@/lib/search";

export type PaymentsWithUser = Prisma.PaymentGetPayload<{
  include: { user: true };
}>;

export type PaginatedResult<T> = {
  data: T[];
  page: number;
};

export const getAllPaginatedPayments = async (
  page = 1,
  search = "",
  limit = 10,
) => {
  const admin = await getCurrentUser();

  if (!admin) {
    throw new Error("Nieautoryzowany");
  }

  const skip = (page - 1) * limit;

  const where = getPaymentsSearch(search);

  const data = await prisma.payment.findMany({
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
  } as PaginatedResult<PaymentsWithUser>;
};

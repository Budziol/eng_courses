import { Prisma } from "@prisma/client";

export const getMeetingSearch = (search?: string): Prisma.MeetingWhereInput => {
  if (!search) return {};

  return {
    OR: [
      {
        userId: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        link: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        user: {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      },
      {
        user: {
          lastName: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      },
      {
        user: {
          email: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      },
    ],
  };
};

export const getPaymentsSearch = (
  search?: string,
): Prisma.PaymentWhereInput => {
  if (!search) return {};

  return {
    OR: [
      {
        userId: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        user: {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      },
      {
        user: {
          lastName: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      },
      {
        user: {
          email: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      },
    ],
  };
};

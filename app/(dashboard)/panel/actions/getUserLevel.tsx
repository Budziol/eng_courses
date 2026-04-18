import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";

export const getUserLevel = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Nieautoryzowany");
  }

  const foundLevel = await prisma.level.findUnique({
    where: { userId: user.id },
    include: { user: true },
  });

  if (!foundLevel) {
    throw new Error("Nie znaleziono Poziomu dla tego użytkownika");
  }

  return foundLevel;
};

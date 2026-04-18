import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";

export const getUpcomingMeeting = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Nieautoryzowany");
  }

  try {
    const upcomingMeeting = await prisma.meeting.findFirst({
      where: {
        userId: id,
        date: {
          gt: new Date(),
        },
        status: "SCHEDULED",
      },
      orderBy: {
        date: "asc",
      },
    });

    if (!upcomingMeeting) {
      return null;
    }

    return upcomingMeeting;
  } catch (error) {
    console.log(error);
    return null;
  }
};

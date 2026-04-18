"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function startTest() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirectPath=test");
  }

  const test = await prisma.test.create({
    data: { userId: user.id },
  });

  redirect(`/test/${test.id}`);
}

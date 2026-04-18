"use server";

import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 dni

export async function createSession(id: string) {
  const session = await prisma.session.create({
    data: {
      userId: id,
      expiresAt: new Date(Date.now() + SESSION_DURATION),
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("session", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession(sessionId: string) {
  await prisma.session.delete({ where: { id: sessionId } });

  const cookieStore = await cookies();
  cookieStore.delete("session");
}

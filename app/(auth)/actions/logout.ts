"use server";

import { deleteSession } from "@/lib/sessions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("Błąd");
  }

  await deleteSession(sessionId);

  redirect("/");
};

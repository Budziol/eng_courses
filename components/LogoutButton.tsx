"use client";

import { LogOut } from "lucide-react";
import { GhostButton } from "./Buttons";
import { logout } from "@/app/(auth)/actions/logout";
import { useTransition } from "react";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <GhostButton
      className="flex items-center justify-start gap-3 text-left px-4! py-3! font-medium! rounded-xl text-text-main hover:text-main! hover:bg-main-hover/20!"
      onClick={() => handleLogout()}
    >
      {isPending ? (
        "Ładowanie..."
      ) : (
        <>
          <LogOut size={20} />
          Wyloguj się
        </>
      )}
    </GhostButton>
  );
};
export default LogoutButton;

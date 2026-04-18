"use client";

import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { GhostLink } from "@/components/Links";

const UserAsideNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 h-full mb-2">
      <GhostLink
        href="/panel"
        className={`flex items-center justify-start gap-3 text-left rounded-xl text-text-main px-4! py-3! cursor-pointer font-medium! ${pathname === "/panel" ? "bg-main text-white hover:bg-main!" : "hover:bg-text-main/10 hover:text-text-sub"}`}
      >
        <LayoutDashboard size={20} />
        Panel
      </GhostLink>
      <GhostLink
        href="/spotkania"
        className={`flex items-center justify-start gap-3 text-left rounded-xl text-text-main px-4! py-3! cursor-pointer font-medium! ${pathname === "/spotkania" ? "bg-main text-white hover:bg-main!" : "hover:bg-text-main/10 hover:text-text-sub"}`}
      >
        <CalendarDays size={20} />
        Spotkania
      </GhostLink>
      <GhostLink
        href="/platnosci"
        className={`flex items-center justify-start gap-3 text-left rounded-xl text-text-main px-4! py-3! cursor-pointer font-medium! ${pathname === "/platnosci" ? "bg-main text-white hover:bg-main!" : "hover:bg-text-main/10 hover:text-text-sub"}`}
      >
        <CreditCard size={20} />
        Płatności
      </GhostLink>
      <GhostLink
        href="/ustawienia"
        className={`flex items-center justify-start gap-3 text-left rounded-xl text-text-main px-4! py-3! cursor-pointer font-medium! ${pathname === "/ustawienia" ? "bg-main text-white hover:bg-main!" : "hover:bg-text-main/10 hover:text-text-sub"}`}
      >
        <Settings size={20} />
        Ustawienia
      </GhostLink>
    </nav>
  );
};
export default UserAsideNav;

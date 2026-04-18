"use client";

import { usePathname } from "next/navigation";
import { GhostLink } from "../../../components/Links";
import { CalendarDays, CreditCard, LayoutDashboard, User } from "lucide-react";

const AdminAsideNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 h-full mb-2">
      <GhostLink
        href="/admin/panel"
        className={`flex items-center justify-start gap-3 text-left rounded-xl text-text-main px-4! py-3! cursor-pointer font-medium! ${pathname === "/admin/panel" ? "bg-main text-white hover:bg-main!" : "hover:bg-text-main/10 hover:text-text-sub"}`}
      >
        <LayoutDashboard size={20} />
        Panel
      </GhostLink>
      <GhostLink
        href="/admin/uzytkownicy"
        className={`flex items-center justify-start gap-3 text-left rounded-xl text-text-main px-4! py-3! cursor-pointer font-medium! ${pathname === "/admin/uzytkownicy" ? "bg-main text-white hover:bg-main!" : "hover:bg-text-main/10 hover:text-text-sub"}`}
      >
        <User size={20} />
        Użytkownicy
      </GhostLink>
      <GhostLink
        href="/admin/spotkania"
        className={`flex items-center justify-start gap-3 text-left rounded-xl text-text-main px-4! py-3! cursor-pointer font-medium! ${pathname === "/admin/spotkania" ? "bg-main text-white hover:bg-main!" : "hover:bg-text-main/10 hover:text-text-sub"}`}
      >
        <CalendarDays size={20} />
        Spotkania
      </GhostLink>
      <GhostLink
        href="/admin/platnosci"
        className={`flex items-center justify-start gap-3 text-left rounded-xl text-text-main px-4! py-3! cursor-pointer font-medium! ${pathname === "/admin/platnosci" ? "bg-main text-white hover:bg-main!" : "hover:bg-text-main/10 hover:text-text-sub"}`}
      >
        <CreditCard size={20} />
        Płatności
      </GhostLink>
    </nav>
  );
};
export default AdminAsideNav;

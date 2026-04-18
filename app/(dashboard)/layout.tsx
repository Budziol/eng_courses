import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { redirect } from "next/navigation";
import UserAside from "./components/UserAside";
import MobileNav from "./components/mobile-nav";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie");
  }

  if (!user.active) {
    redirect("/aktywacja");
  }

  return (
    <section className="min-h-screen bg-muted flex gap-8">
      <UserAside />
      <MobileNav />
      <main className="pt-14 lg:pt-0 w-full">{children}</main>
    </section>
  );
}

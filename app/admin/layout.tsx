import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { redirect } from "next/navigation";
import AdminAside from "./components/AdminAside";
import AdminMobileNav from "./components/admin-mobile-nav";

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

  if (user.role !== "ADMIN") {
    redirect("/panel");
  }

  return (
    <section className="min-h-screen bg-muted flex gap-8">
      <div className="hidden lg:block relative w-64 shrink-0">
        <AdminAside />
      </div>
      <AdminMobileNav />
      <main className="pt-14 lg:pt-0 w-full">
        <div className="flex flex-col max-w-[1440px] mx-auto px-4 py-6 h-full">
          {children}
        </div>
      </main>
    </section>
  );
}

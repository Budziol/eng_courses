import Logo from "@/components/Logo";
import { getCurrentUser } from "../(auth)/lib/auth";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie?redirectPath=test");
  }

  if (!user.active) {
    redirect("/aktywacja");
  }

  return (
    <main className="min-h-screen flex">
      <div className="w-full max-w-md mx-auto my-auto space-y-16 px-4">
        <div className="">
          <div className="flex items-center justify-center mb-8">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

import Footer from "@/app/(root)/components/Footer/Footer";
import Navbar from "@/app/(root)/components/Navbar/Navbar";
import { getCurrentUser } from "@/app/(auth)/lib/auth";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <>
      <Navbar user={user} />
      {children}
      <Footer />
    </>
  );
}

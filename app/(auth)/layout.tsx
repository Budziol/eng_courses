import Logo from "@/components/Logo";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

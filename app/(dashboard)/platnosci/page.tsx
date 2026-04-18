import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { getAllPaymentsPages } from "@/app/admin/platnosci/actions/getAllPaymentsPages";
import PaymentsTable from "@/app/admin/platnosci/components/payments-table";
import DashboardHeader from "@/components/DashboardHeader";
import Loader from "@/components/Loaders/Loader";
import NewPagination from "@/components/Pagination/new-pagination";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ page: number }>;
};

const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = params?.page || 1;

  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie");
  }

  const { totalPages } = await getAllPaymentsPages(user.id);

  return (
    <div className="flex flex-col max-w-[1440px] mx-auto px-4 py-6 h-full space-y-12">
      <div className="">
        <DashboardHeader heading="Platności" text="Wszystkie platności" />
      </div>
      <div className="w-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-lg relative overflow-auto">
        <Suspense key={page} fallback={<Loader />}>
          <PaymentsTable page={page} search={user.id} limit={10} />
        </Suspense>
      </div>
      {totalPages > 1 && <NewPagination totalPages={totalPages} />}
    </div>
  );
};
export default page;

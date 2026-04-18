import DashboardHeader from "@/components/DashboardHeader";
import Loader from "@/components/Loaders/Loader";
import { Suspense } from "react";
import NewPagination from "@/components/Pagination/new-pagination";
import { getAllPaymentsPages } from "./actions/getAllPaymentsPages";
import MeetingsSearch from "../spotkania/components/meetings-search";
import PaymentsTable from "./components/payments-table";
import PaymentEditModal from "../uzytkownik/components/payment-edit-modal";
import PaymentEditModalWrapper from "./components/payment-edit-modal-wrapper";

type Props = {
  searchParams: Promise<{
    page: number;
    search: string;
    edit: string;
  }>;
};

const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = params?.page || 1;
  const search = params?.search || "";

  const showModal = params?.edit;

  const { totalPages } = await getAllPaymentsPages(search);

  return (
    <div className="space-y-12">
      <div className="">
        <DashboardHeader heading="Spotkania" text="Wszystkie spotkania" />
      </div>
      <div className="w-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-lg relative overflow-auto">
        <div className="">
          <MeetingsSearch placeholder="wyszukaj..." />
        </div>
        <Suspense key={search + page} fallback={<Loader />}>
          <PaymentsTable page={page} search={search} limit={10} admin={true} />
        </Suspense>
      </div>
      <NewPagination totalPages={totalPages} />
      {showModal && (
        <PaymentEditModalWrapper
          paymentId={showModal}
          onClose={() => `/admin/platnosci?page=${page}&search=${search}`}
        />
      )}
    </div>
  );
};
export default page;

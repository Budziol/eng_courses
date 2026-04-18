"use client";

import { useEffect, useState, useTransition } from "react";
import { Payment, User } from "@/lib/generated/prisma/client";
import {
  getPaginatedPayments,
  PaginatedResult,
} from "../actions/gePaginatedPayments";
import PaymentTable from "./payment-table";
import Pagination from "@/components/Pagination/Pagination";
import PaymentEditModal from "./payment-edit-modal";
import PaymentAddModal from "./payment-add-modal";
import { PrimaryButton } from "@/components/Buttons";

type Props = {
  user: User;
  latestPayment: Payment | null;
};

const UserPayments = ({ user, latestPayment }: Props) => {
  const [data, setData] = useState<PaginatedResult<Payment> | null>(null);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getPaginatedPayments({
        userId: user.id,
        page: page,
        limit: 10,
      });
      setData(result);
    });
  }, [page, user]);

  const [slectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );

  const handlePaymentSelect = (meetingId: string) => {
    setSelectedPaymentId(meetingId);
  };

  const handlePaymentDeselect = () => {
    setSelectedPaymentId(null);
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleHideAddModal = () => {
    setShowAddModal(false);
  };

  if (!data && isPending) return <p>Ładowanie...</p>;

  if (!data) return <div className="">Brak</div>;

  const changePage = (page: number) => {
    if (page < 1 || page > data.totalPages) return;
    setPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="w-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-lg relative overflow-auto">
        <div className="flex gap-3 justify-between items-center">
          <h4 className="">Płatności</h4>
          <PrimaryButton className="w-fit!" onClick={handleShowAddModal}>
            Dodaj płatność
          </PrimaryButton>
        </div>
        <div style={{ opacity: isPending ? 0.5 : 1 }}>
          <PaymentTable
            data={data.payments}
            onPaymentSelect={handlePaymentSelect}
          />
        </div>
      </div>
      {data.payments.length >= 1 && (
        <Pagination
          totalPages={data.totalPages}
          pageParam={data.page}
          isPending={isPending}
          onPageChange={changePage}
        />
      )}
      {showAddModal && (
        <PaymentAddModal
          user={user}
          onClose={handleHideAddModal}
          latestPayment={latestPayment}
        />
      )}
      {slectedPaymentId && (
        <PaymentEditModal
          user={user}
          payments={data.payments}
          paymentId={slectedPaymentId}
          onClose={handlePaymentDeselect}
        />
      )}
    </div>
  );
};
export default UserPayments;

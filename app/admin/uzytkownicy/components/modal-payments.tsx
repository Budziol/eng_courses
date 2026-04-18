"use client";

import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import {
  startTransition,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  addUserPayment,
  AddUserPaymentState,
} from "../../../../actions/addUserPayment";
import { addMonths, format } from "date-fns";
import { formatDate } from "@/lib/hooks/formatDate";
import Loader from "@/components/Loaders/Loader";
import PaymentBadge from "../../../../components/Payments/payment-badge";
import { Payment } from "@prisma/client";

type Props = {
  payments: Payment[];
  userId: string;
};

const initial: AddUserPaymentState = {
  success: false,
};

const ModalPayments = ({ payments, userId }: Props) => {
  useEffect(() => {
    console.log(userId);
  }, [userId]);

  const [state, addPayment, isPending] = useActionState(
    addUserPayment,
    initial,
  );

  const [showAddPeyment, setShowAddPayment] = useState(false);

  const [paidAt, setPaidAt] = useState(formatDate(new Date()));
  const [paidTo, setPaidTo] = useState(formatDate(addMonths(new Date(), 1)));

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("paidAt", paidAt);
    formData.append("paidTo", paidTo);
    formData.append("userId", userId);

    startTransition(() => {
      addPayment(formData);
    });
  };

  return isPending ? (
    <Loader />
  ) : (
    <div className="space-y-4">
      <h4 className="">Płatności</h4>
      <div className="">
        <p className="text-sm">Status</p>
        {payments.length > 0 ? (
          <div className="">
            <div className="flex gap-3">
              <PaymentBadge paidTo={payments[0].paidTo} />
            </div>
          </div>
        ) : (
          <div className="">Brak</div>
        )}
      </div>
      <div className="">
        <p className="text-sm">Ostatnia płatność</p>
        {payments.length > 0 ? (
          <div className="">
            <div className="flex gap-3">
              <p className="text-text-sub">
                {formatDate(payments[0].paidAt)} -{" "}
                {formatDate(payments[0].paidTo)}
              </p>
            </div>
          </div>
        ) : (
          <div className="">Brak</div>
        )}
      </div>
      <div className="mt-6">
        {!showAddPeyment ? (
          <SecondaryButton className="" onClick={() => setShowAddPayment(true)}>
            Dodaj
          </SecondaryButton>
        ) : (
          <div className="">
            <form className="" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div className="w-full">
                  <label className="">Od:</label>
                  <input
                    type="date"
                    id="paidAt"
                    name="paidAt"
                    value={paidAt}
                    onChange={(e) => setPaidAt(e.target.value)}
                    min="2026-01-01"
                    max="2036-12-31"
                  />
                </div>
                <div className="w-full">
                  <label className="">Do:</label>
                  <input
                    type="date"
                    id="paidTo"
                    name="paidTo"
                    value={paidTo}
                    onChange={(e) => setPaidTo(e.target.value)}
                    min="2026-01-01"
                    max="2036-12-31"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
                <PrimaryButton
                  disabled={isPending}
                  className="sm:order-2"
                  type="submit"
                >
                  {isPending ? "Ładowanie..." : "Zapisz"}
                </PrimaryButton>
                <SecondaryButton
                  disabled={isPending}
                  className="sm:order-1"
                  type="button"
                  onClick={() => setShowAddPayment(false)}
                >
                  {isPending ? "Ładowanie..." : "Anuluj"}
                </SecondaryButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default ModalPayments;

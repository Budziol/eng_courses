"use client";

import { addUserPayment, AddUserPaymentState } from "@/actions/addUserPayment";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { formatDate } from "@/lib/hooks/formatDate";
import { addMonths } from "date-fns";
import { startTransition, useActionState, useEffect, useState } from "react";
import Loader from "../Loaders/Loader";
import { PaymentFormValues } from "@/lib/validators/payment";

type Props = {
  userId?: string;
  paymentId?: string;
  startDate?: Date;
  endDate?: Date;
  onClose?: () => void;
  dispatch: (formData: FormData) => void;
  fieldErrors?: Record<string, string[]>;
};

type FieldName = keyof PaymentFormValues;

const PaymentForm = ({
  userId,
  paymentId,
  startDate,
  endDate,
  onClose = () => {},
  dispatch,
  fieldErrors,
}: Props) => {
  const [paidAt, setPaidAt] = useState(formatDate(startDate ?? new Date()));
  const [paidTo, setPaidTo] = useState(
    formatDate(endDate ?? addMonths(new Date(), 1)),
  );

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("paidAt", paidAt);
    formData.append("paidTo", paidTo);
    if (userId) {
      formData.append("userId", userId);
    }
    if (paymentId) {
      formData.append("paymentId", paymentId);
    }

    startTransition(() => {
      dispatch(formData);
    });
  };

  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({
    paidAt: false,
    paidTo: false,
  });

  const handleTouched = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="mt-6">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="w-full">
              <label className="">Od:</label>
              <input
                type="date"
                id="paidAt"
                name="paidAt"
                value={paidAt}
                onChange={(e) => setPaidAt(e.target.value)}
                onFocus={(e) => handleTouched(e)}
                className={
                  fieldErrors?.paidAt && !touched.paidAt
                    ? " border-red-500!"
                    : ""
                }
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
                onFocus={(e) => handleTouched(e)}
                className={
                  fieldErrors?.paidTo && !touched.paidTo
                    ? " border-red-500!"
                    : ""
                }
                min="2026-01-01"
                max="2036-12-31"
              />
            </div>
          </div>
          <div className="text-[12px]">
            {fieldErrors?.paidAt &&
              !touched.paidAt &&
              fieldErrors.paidTo.map((item) => (
                <p key={item} className="text-red-500">
                  * {item}
                </p>
              ))}
            {fieldErrors?.paidTo &&
              !touched.paidTo &&
              fieldErrors.paidTo.map((item) => (
                <p key={item} className="text-red-500">
                  * {item}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          <PrimaryButton className="sm:order-2" type="submit">
            Zapisz
          </PrimaryButton>
          <SecondaryButton
            className="sm:order-1"
            type="button"
            onClick={() => onClose()}
          >
            Anuluj
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
};
export default PaymentForm;

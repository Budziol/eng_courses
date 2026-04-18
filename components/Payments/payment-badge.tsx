"use client";

import { PAYMENT_BADGE } from "@/utils/records";
import { useEffect, useState } from "react";

type Props = {
  paidTo: Date | undefined;
};

type PaymentStatus = keyof typeof PAYMENT_BADGE;

const PaymentBadge = ({ paidTo }: Props) => {
  const [status, setStatus] = useState<PaymentStatus>("UNPAID");

  useEffect(() => {
    if (!paidTo) {
      setStatus("UNPAID");
      return;
    }

    const now = new Date();
    const paidDate = new Date(paidTo);

    if (paidDate > now) {
      setStatus("PAID");
    } else {
      setStatus("UNPAID");
    }
  }, [paidTo]);

  return (
    <p
      className={`min-w-[100] rounded-full px-3 py-1 font-bold text-xs flex items-center justify-center w-fit lowercase ${
        status === "PAID"
          ? "bg-main text-white"
          : "bg-muted border border-border text-text-sub"
      }`}
    >
      {PAYMENT_BADGE[status]}
    </p>
  );
};
export default PaymentBadge;

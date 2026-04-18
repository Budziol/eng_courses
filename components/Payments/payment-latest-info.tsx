"use client";

import { formatDate } from "@/lib/hooks/formatDate";
import { getLatestPayment } from "../../app/admin/uzytkownik/actions/getLatestPayment";
import { useEffect, useState, useTransition } from "react";
import Loader from "@/components/Loaders/Loader";
import { Payment } from "@/lib/generated/prisma/client";

type Props = {
  userId: string;
  latestPayment: Payment | null;
};

const PaymentLatestInfo = ({ userId, latestPayment }: Props) => {
  return (
    <div className="">
      <p className="text-sm">Ostatnia płatność</p>
      {latestPayment ? (
        <div className="">
          <div className="flex gap-3">
            <p className="text-text-sub">
              {formatDate(latestPayment.paidAt)} -{" "}
              {formatDate(latestPayment.paidTo)}
            </p>
          </div>
        </div>
      ) : (
        <div className="">Brak</div>
      )}
    </div>
  );
};
export default PaymentLatestInfo;

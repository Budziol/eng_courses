import { Suspense } from "react";
import { findPaymentById } from "../actions/findPaymentById";
import Loader from "@/components/Loaders/Loader";
import PaymentEditModal from "./payment-edit-modal";

type Props = {
  paymentId: string;
  onClose: () => void;
};

const PaymentEditModalWrapper = async ({ paymentId, onClose }: Props) => {
  const payment = await findPaymentById(paymentId);

  return (
    <Suspense fallback={<Loader />}>
      <PaymentEditModal payment={payment} />
    </Suspense>
  );
};
export default PaymentEditModalWrapper;

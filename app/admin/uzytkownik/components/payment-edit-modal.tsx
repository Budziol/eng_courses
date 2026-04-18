"use client";

import ModalBackground from "@/components/modal-background";
import PaymentForm from "@/components/Payments/payment-form";
import { startTransition, useActionState } from "react";
import {
  updateUserPayment,
  UpdateUserPaymentState,
} from "../actions/updateUserPayment";
import { Trash2 } from "lucide-react";
import {
  deleteUserPayment,
  DeleteUserPaymentState,
} from "../actions/deleteUserPayment";
import Loader from "@/components/Loaders/Loader";
import PaymentModalStatus from "./payment-modal-status";
import { Payment, User } from "@/lib/generated/prisma/client";

type Props = {
  user: User;
  payments: Payment[];
  paymentId: string;
  onClose: () => void;
};

const updateInitial: UpdateUserPaymentState = {
  success: false,
  message: "",
  fieldErrors: {},
};

const deleteInitial: DeleteUserPaymentState = {
  success: false,
  message: "",
  fieldErrors: {},
};

const PaymentEditModal = ({ user, payments, paymentId, onClose }: Props) => {
  const [updateState, updatePayment, updateIsPending] = useActionState(
    updateUserPayment,
    updateInitial,
  );

  const foundPayment = payments.find((item) => item.id === paymentId);

  const [deleteState, deletePayment, deleteIsPending] = useActionState(
    deleteUserPayment,
    deleteInitial,
  );

  const handleDelete = (paymentId: string) => {
    startTransition(() => {
      deletePayment(paymentId);
    });
  };

  return (
    <ModalBackground onClose={onClose}>
      {updateIsPending || deleteIsPending ? (
        <Loader />
      ) : updateState.success || deleteState.success ? (
        <PaymentModalStatus onClose={onClose} isError={false}>
          {updateState.success
            ? "Pomyślnie zmieniono wybraną płatność"
            : "Pomyślnie usunięto wybraną płatność"}
        </PaymentModalStatus>
      ) : deleteState.message || updateState.message ? (
        <PaymentModalStatus onClose={onClose} isError={true}>
          {updateState.message ? updateState.message : deleteState.message}
        </PaymentModalStatus>
      ) : (
        <>
          <div className="">
            <h4 className="">Edytuj płatność</h4>
            <p className="text-sm">
              Dla: {user.name} {user.lastName}
            </p>
            <p className="text-sm">ID: {user.id}</p>
          </div>
          <div className="p-1 absolute top-0 right-10">
            <button
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-main/10 hover:text-main cursor-pointer w-10 h-10"
              onClick={() => handleDelete(paymentId)}
            >
              <Trash2 size={18} />
            </button>
          </div>
          <PaymentForm
            paymentId={paymentId}
            dispatch={(formData) => updatePayment(formData)}
            startDate={foundPayment?.paidAt}
            endDate={foundPayment?.paidTo}
            onClose={onClose}
            fieldErrors={updateState.fieldErrors || updateState.fieldErrors}
          />
        </>
      )}
    </ModalBackground>
  );
};
export default PaymentEditModal;

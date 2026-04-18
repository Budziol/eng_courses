"use client";

import ModalBackground from "@/components/modal-background";
import { PaymentWithUser } from "../actions/findPaymentById";
import {
  updateUserPayment,
  UpdateUserPaymentState,
} from "../../uzytkownik/actions/updateUserPayment";
import {
  deleteUserPayment,
  DeleteUserPaymentState,
} from "../../uzytkownik/actions/deleteUserPayment";
import { startTransition, useActionState } from "react";
import PaymentForm from "@/components/Payments/payment-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loaders/Loader";
import PaymentModalStatus from "../../uzytkownik/components/payment-modal-status";
import { Trash2 } from "lucide-react";

type Props = {
  payment: PaymentWithUser | null;
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

const PaymentEditModal = ({ payment }: Props) => {
  const [updateState, updatePayment, updateIsPending] = useActionState(
    updateUserPayment,
    updateInitial,
  );

  const [deleteState, deletePayment, deleteIsPending] = useActionState(
    deleteUserPayment,
    deleteInitial,
  );

  const handleDelete = (paymentId: string) => {
    startTransition(() => {
      deletePayment(paymentId);
    });
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("edit");

    const newUrl =
      params.toString().length > 0
        ? `${pathname}?${params.toString()}`
        : pathname;

    router.replace(newUrl);
  };

  return (
    <ModalBackground onClose={handleClose}>
      {!payment ? (
        <div>Brak</div>
      ) : updateIsPending || deleteIsPending ? (
        <Loader />
      ) : updateState.success || deleteState.success ? (
        <PaymentModalStatus onClose={handleClose} isError={false}>
          {updateState.success
            ? "Pomyślnie zmieniono wybraną płatność"
            : "Pomyślnie usunięto wybraną płatność"}
        </PaymentModalStatus>
      ) : deleteState.message || updateState.message ? (
        <PaymentModalStatus onClose={handleClose} isError={true}>
          {updateState.message ? updateState.message : deleteState.message}
        </PaymentModalStatus>
      ) : (
        <>
          <div className="">
            <h4 className="">Edytuj płatność</h4>
            <p className="text-sm">
              Dla: {payment.user.name} {payment.user.lastName}
            </p>
            <p className="text-sm">ID: {payment.user.id}</p>
          </div>
          <div className="p-1 absolute top-0 right-10">
            <button
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-main/10 hover:text-main cursor-pointer w-10 h-10"
              onClick={() => handleDelete(payment.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
          <PaymentForm
            paymentId={payment.id}
            dispatch={(formData) => updatePayment(formData)}
            startDate={payment.paidAt}
            endDate={payment.paidTo}
            onClose={handleClose}
            fieldErrors={updateState.fieldErrors || updateState.fieldErrors}
          />
        </>
      )}
    </ModalBackground>
  );
};
export default PaymentEditModal;

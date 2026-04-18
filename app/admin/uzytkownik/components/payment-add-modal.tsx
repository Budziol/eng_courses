"use client";

import { Payment, User } from "@/lib/generated/prisma/client";
import PaymentForm from "@/components/Payments/payment-form";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { useActionState, useState } from "react";
import { addUserPayment, AddUserPaymentState } from "@/actions/addUserPayment";
import Loader from "@/components/Loaders/Loader";
import ModalBackground from "@/components/modal-background";
import PaymentLatestInfo from "@/components/Payments/payment-latest-info";

type Props = {
  user: User;
  onClose: () => void;
  latestPayment: Payment | null;
};

const initial: AddUserPaymentState = {
  success: false,
};

const PaymentAddModal = ({ user, onClose, latestPayment }: Props) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [state, addPayment, isPending] = useActionState(
    addUserPayment,
    initial,
  );

  return (
    <ModalBackground onClose={onClose}>
      {state.success ? (
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-main uppercase">Sukces!</h3>
            <p className="">Dodano nową płatność</p>
          </div>
          <PrimaryButton onClick={() => onClose()} className="w-fit! mx-auto">
            Zamknij
          </PrimaryButton>
        </div>
      ) : (
        <>
          <div className="">
            <h4 className="">Nowa płatność</h4>
            <p className="text-sm">
              Dla: {user.name} {user.lastName}
            </p>
            <p className="text-sm">ID: {user.id}</p>
          </div>
          {isPending ? (
            <Loader />
          ) : (
            <>
              <PaymentLatestInfo
                userId={user.id}
                latestPayment={latestPayment}
              />
              {!showPaymentForm ? (
                <PrimaryButton
                  className=""
                  onClick={() => setShowPaymentForm(true)}
                >
                  Dodaj
                </PrimaryButton>
              ) : (
                <PaymentForm
                  userId={user.id}
                  onClose={() => setShowPaymentForm(false)}
                  dispatch={(formData) => addPayment(formData)}
                  fieldErrors={state.fieldErrors}
                />
              )}
            </>
          )}
        </>
      )}
    </ModalBackground>
  );
};
export default PaymentAddModal;

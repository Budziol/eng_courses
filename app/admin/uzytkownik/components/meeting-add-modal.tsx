"use client";

import ModalBackground from "@/components/modal-background";
import { Meeting, User } from "@/lib/generated/prisma/client";
import { addUserMeeting, AddUserMeetingState } from "../actions/addUserMeeting";
import { useActionState, useEffect, useState } from "react";
import Loader from "@/components/Loaders/Loader";
import { PrimaryButton } from "@/components/Buttons";
import MeetingLatestInfo from "./meeting-latest-info";
import MeetingForm from "@/components/Meetings/meeting-form";

type Props = {
  user: User;
  onClose: () => void;
  latestMeeting: Meeting | null; // Przekazujemy dane pobrane na serwerze
};

const initial: AddUserMeetingState = { success: false };

export default function MeetingAddModal({
  user,
  onClose,
  latestMeeting,
}: Props) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [state, addMeeting, isPending] = useActionState(
    addUserMeeting,
    initial,
  );

  return (
    <ModalBackground onClose={onClose}>
      {state.success ? (
        <div className="space-y-6 text-center">
          <h3 className="text-main uppercase font-bold">Sukces!</h3>
          <p>Dodano nowe spotkanie</p>
          <PrimaryButton onClick={onClose}>Zamknij</PrimaryButton>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold">Nowe spotkanie</h4>
            <p className="text-sm text-gray-500">
              Dla: {user.name} {user.lastName}
            </p>
          </div>

          <MeetingLatestInfo latestMeeting={latestMeeting} />

          {isPending ? (
            <Loader />
          ) : !showPaymentForm ? (
            <PrimaryButton onClick={() => setShowPaymentForm(true)}>
              Dodaj
            </PrimaryButton>
          ) : (
            <MeetingForm
              userId={user.id}
              onClose={() => setShowPaymentForm(false)}
              dispatch={(formData) => addMeeting(formData)}
              fieldErrors={state.fieldErrors}
            />
          )}
        </div>
      )}
    </ModalBackground>
  );
}

import Loader from "@/components/Loaders/Loader";
import ModalBackground from "@/components/modal-background";
import PaymentModalStatus from "./payment-modal-status";
import MeetingForm from "@/components/Meetings/meeting-form";
import { startTransition, useActionState } from "react";
import { Trash2 } from "lucide-react";
import {
  deleteUserMeeting,
  DeleteUserMeetingState,
} from "../actions/deleteUserMeeting";
import {
  updateUserMeeting,
  UpdateUserMeetingState,
} from "../actions/updateUserMeeting";
import { Meeting, User } from "@prisma/client";

type Props = {
  user: User;
  meetings: Meeting[];
  meetingId: string;
  onClose: () => void;
};

const updateInitial: UpdateUserMeetingState = {
  success: false,
  message: "",
  fieldErrors: {},
};

const deleteInitial: DeleteUserMeetingState = {
  success: false,
  message: "",
  fieldErrors: {},
};

const MeetingEditModal = ({ user, meetings, meetingId, onClose }: Props) => {
  const [updateState, updateMeeting, updateIsPending] = useActionState(
    updateUserMeeting,
    updateInitial,
  );

  const foundMeeting = meetings.find((item) => item.id === meetingId);

  const [deleteState, deleteMeeting, deleteIsPending] = useActionState(
    deleteUserMeeting,
    deleteInitial,
  );

  const handleDelete = (meetingId: string) => {
    startTransition(() => {
      deleteMeeting(meetingId);
    });
  };

  return (
    <ModalBackground onClose={onClose}>
      {updateIsPending || deleteIsPending ? (
        <Loader />
      ) : updateState.success || deleteState.success ? (
        <PaymentModalStatus onClose={onClose} isError={false}>
          {updateState.success
            ? "Pomyślnie zmieniono wybrane spotkanie"
            : "Pomyślnie usunięto wybrane spotkanie"}
        </PaymentModalStatus>
      ) : deleteState.message || updateState.message ? (
        <PaymentModalStatus onClose={onClose} isError={true}>
          {updateState.message ? updateState.message : deleteState.message}
        </PaymentModalStatus>
      ) : (
        <>
          <div className="">
            <h4 className="">Edytuj spotkanie</h4>
            <p className="text-sm">
              Dla: {user.name} {user.lastName}
            </p>
            <p className="text-sm">ID: {user.id}</p>
          </div>
          <div className="p-1 absolute top-0 right-10">
            <button
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-main/10 hover:text-main cursor-pointer w-10 h-10"
              onClick={() => handleDelete(meetingId)}
            >
              <Trash2 size={18} />
            </button>
          </div>
          <MeetingForm
            userId={user.id}
            meetingId={meetingId}
            dispatch={(formData) => updateMeeting(formData)}
            startDate={foundMeeting?.date}
            currentStatus={foundMeeting?.status}
            currentLink={foundMeeting?.link}
            onClose={onClose}
            fieldErrors={updateState.fieldErrors || updateState.fieldErrors}
          />
        </>
      )}
    </ModalBackground>
  );
};
export default MeetingEditModal;

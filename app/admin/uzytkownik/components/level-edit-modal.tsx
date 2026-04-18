import { PrimaryButton } from "@/components/Buttons";
import Loader from "@/components/Loaders/Loader";
import ModalBackground from "@/components/modal-background";
import { Level, User } from "@/lib/generated/prisma/client";
import LevelEditForm from "./level-edit-form";
import { useActionState, useEffect } from "react";
import {
  updateUserLevel,
  UpdateUserLevelState,
} from "../actions/updateUserLevel";

type Props = {
  user: User;
  level: Level | null;
  onClose: () => void;
};

const updateInitial: UpdateUserLevelState = {
  success: false,
  message: "",
  fieldErrors: {},
};

const LevelEditModal = ({ user, level, onClose }: Props) => {
  const [updateState, updateMeeting, updateIsPending] = useActionState(
    updateUserLevel,
    updateInitial,
  );

  useEffect(() => {
    console.log(updateState);
  }, [updateState]);

  return (
    <ModalBackground onClose={onClose}>
      {updateState.success ? (
        <div className="space-y-6 text-center">
          <h3 className="text-main uppercase font-bold">Sukces!</h3>
          <p>Pomyślnie zmieniono poziom</p>
          <PrimaryButton onClick={onClose}>Zamknij</PrimaryButton>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold">Edytuj poziom</h4>
            <p className="text-sm text-gray-500">
              Dla: {user.name} {user.lastName}
            </p>
          </div>
          {updateIsPending ? (
            <Loader />
          ) : (
            <LevelEditForm
              userId={user.id}
              onClose={onClose}
              dispatch={(formData) => updateMeeting(formData)}
              fieldErrors={updateState?.fieldErrors}
              currentSpeaking={level?.speaking}
              currentListening={level?.listening}
              currentReading={level?.reading}
              currentWriting={level?.writing}
              levelId={level?.id}
              currentLevel={level?.Level}
            />
          )}
        </div>
      )}
    </ModalBackground>
  );
};
export default LevelEditModal;

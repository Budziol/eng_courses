"use client";

import ProgressCard from "@/components/ProgressCard";
import { PrimaryButton } from "@/components/Buttons";
import { Level, User } from "@/lib/generated/prisma/client";
import { useState } from "react";
import LevelEditModal from "./level-edit-modal";

type Props = {
  user: User;
  level: Level | null;
};

const UserLevel = ({ user, level }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {level ? (
        <ProgressCard
          level={level.Level}
          talkingLvl={level.speaking}
          listeningLvl={level.listening}
          readingLvl={level.reading}
          writingLvl={level.writing}
          lessons={level.Lessons}
          className="rounded-none! shadow-none! border-none! p-0!"
        />
      ) : (
        <p className="">Brak</p>
      )}
      <PrimaryButton
        className="min-w-[100] w-fit! mx-auto"
        onClick={() => setShowModal(true)}
      >
        Edytuj
      </PrimaryButton>
      {showModal && (
        <LevelEditModal
          level={level}
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
export default UserLevel;

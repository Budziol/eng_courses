"use client";

import {
  checkCodeStatusState,
  resetActivationCode,
} from "@/app/(auth)/aktywacja/actions/activationCode";
import { useEffect, useState, useTransition } from "react";
import { PrimaryButton } from "../../../../components/Buttons";
import ActivationForm from "./ActivationForm";

const Activation = ({
  userId,
  codeStatus,
  redirectPath,
}: {
  userId: string;
  codeStatus: checkCodeStatusState;
  redirectPath?: string;
}) => {
  const [status, setStatus] = useState(codeStatus.success);
  const [expiry, setExpiry] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (codeStatus.success && codeStatus.time) {
      setExpiry(new Date(codeStatus.time).getTime());
      setStatus(true);
    } else {
      setExpiry(null);
      setStatus(false);
    }
  }, [codeStatus]);

  useEffect(() => {
    if (!expiry) return;

    const update = () => {
      const diff = Math.floor((expiry - Date.now()) / 1000);
      if (diff > 0) {
        setTime(diff);
      } else {
        setTime(0);
        setStatus(false);
      }
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [expiry]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleClick = () => {
    startTransition(async () => {
      const result = await resetActivationCode(userId);

      if (result.success && result.time) {
        setExpiry(new Date(result.time).getTime());
        setStatus(true);
      }
    });
  };

  return (
    <div className="">
      {status ? (
        <div className="p-6 pt-0 space-y-6">
          <p className="text-center text-sm">
            Wprowadź kod który dostałeś od nas w wiadomości email.
          </p>
          <p className="text-sm text-center">
            Czas do wygaśnięcia kodu:{" "}
            <span className="font-bold text-text-sub">{formatTime(time)}</span>
          </p>
          <ActivationForm redirectPath={redirectPath} />
        </div>
      ) : (
        <div className="p-6 pt-0 space-y-6">
          <p className="text-center">
            Kod jest już nieważny. Kliknij poniższy przycisk aby dostać nowy
            kod.
          </p>
          <PrimaryButton
            disabled={isPending}
            className=""
            onClick={handleClick}
          >
            {isPending ? "Ładowanie..." : "Wyślij kod"}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};
export default Activation;

"use client";

import { getDisplayStatus } from "@/lib/hooks/getDisplayStatus";
import { STATUS_CONFIG } from "@/utils/records";
import { useEffect, useState } from "react";

type Props = {
  date: Date;
  backendStatus?: "SCHEDULED" | "CANCELLED";
};

const MeetingBadge = ({ date, backendStatus }: Props) => {
  const [status, setStatus] = useState(() =>
    getDisplayStatus(date, backendStatus),
  );

  useEffect(() => {
    setStatus(getDisplayStatus(date, backendStatus));
  }, [date, backendStatus]);

  useEffect(() => {
    function startAlignedInterval() {
      const now = new Date();

      const msUntilNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      const timeout = setTimeout(() => {
        setStatus(getDisplayStatus(date, backendStatus));

        const interval = setInterval(() => {
          setStatus(getDisplayStatus(date, backendStatus));
        }, 60000);

        cleanup.interval = interval;
      }, msUntilNextMinute);

      cleanup.timeout = timeout;
    }

    const cleanup: {
      timeout?: NodeJS.Timeout;
      interval?: NodeJS.Timeout;
    } = {};

    startAlignedInterval();

    return () => {
      if (cleanup.timeout) clearTimeout(cleanup.timeout);
      if (cleanup.interval) clearInterval(cleanup.interval);
    };
  }, [date, backendStatus]);

  const config = STATUS_CONFIG[status];

  return (
    <p
      className={`min-w-[100] rounded-full px-3 py-1 font-bold text-xs flex items-center justify-center w-fit lowercase ${config.className}`}
    >
      {config.label}
    </p>
  );
};

export default MeetingBadge;

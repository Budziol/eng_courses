import { Lvl, MeetingStatus } from "@/lib/generated/prisma/enums";

export const STATUS_LABELS: Record<MeetingStatus, string> = {
  SCHEDULED: "Oczekujące",
  CANCELLED: "Odwołane",
};

export const PAYMENT_BADGE = {
  UNPAID: "nieważne",
  PAID: "ważne",
} as const;

export const STATUS_CONFIG = {
  UPCOMING: {
    label: "Zaplanowane",
    className: "bg-main text-white",
  },
  ONGOING: {
    label: "Trwa",
    className: "bg-green-500 text-white",
  },
  COMPLETED: {
    label: "Zakończone",
    className: "bg-white border border-border text-text-sub",
  },
  CANCELLED: {
    label: "Anulowane",
    className: "bg-muted border border-border text-text-sub",
  },
} as const;

export const LVL_LEVEL: Record<Lvl, string> = {
  Unknown: "Nieznany",
  A1: "A1",
  A2: "A2",
  B1: "B1",
  B2: "B2",
  C1: "C1",
  C2: "C2",
  Beginner: "Początkujący",
};

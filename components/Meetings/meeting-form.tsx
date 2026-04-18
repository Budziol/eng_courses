"use client";

import { startTransition, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { formatDate } from "@/lib/hooks/formatDate";
import { MeetingFormValues } from "@/lib/validators/meeting";
import { MeetingStatus } from "@/lib/generated/prisma/enums";
import { STATUS_LABELS } from "@/utils/records";

type Props = {
  userId: string;
  onClose: () => void;
  dispatch: (formData: FormData) => void;
  startDate?: Date;
  meetingId?: string;
  currentStatus?: MeetingStatus;
  currentLink?: string;
  fieldErrors?: Record<string, string[]>;
};

type FieldName = keyof MeetingFormValues;

const MeetingForm = ({
  userId,
  onClose,
  dispatch,
  startDate,
  meetingId,
  currentStatus,
  currentLink,
  fieldErrors,
}: Props) => {
  const start = startDate ? new Date(startDate) : new Date();

  const [date, setDate] = useState(formatDate(start));
  const [time, setTime] = useState(start.toTimeString().slice(0, 5));
  const [link, setLink] = useState(currentLink ?? "");
  const [status, setStatus] = useState<MeetingStatus>(
    currentStatus ?? "SCHEDULED",
  );

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("date", `${date}T${time}`);
    formData.append("link", link);
    formData.append("status", status);
    if (userId) {
      formData.append("userId", userId);
    }
    if (meetingId) {
      formData.append("meetingId", meetingId);
    }

    startTransition(() => {
      dispatch(formData);
    });
  };

  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({
    date: false,
    link: false,
    status: false,
  });

  const handleTouched = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="mt-6">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-3">
            <div className="w-full">
              <label htmlFor="date" className="">
                Data spotkania:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onFocus={(e) => handleTouched(e)}
                className={
                  fieldErrors?.date && !touched.date ? " border-red-500!" : ""
                }
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="w-full">
              <label htmlFor="time" className="">
                Godzina spotkania:
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onFocus={(e) => handleTouched(e)}
                className={
                  fieldErrors?.date && !touched.date ? " border-red-500!" : ""
                }
                min={new Date().toDateString()}
              />
            </div>
            <div className="w-full">
              <label htmlFor="link" className="">
                Link:
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onFocus={(e) => handleTouched(e)}
                className={
                  fieldErrors?.link && !touched.link ? " border-red-500!" : ""
                }
              />
            </div>
            <div className="w-full">
              <label htmlFor="status">Status spotkania:</label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as MeetingStatus)}
                className="w-full p-2 border rounded-md"
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-[12px]">
            {fieldErrors?.date &&
              !touched.date &&
              fieldErrors.date.map((item) => (
                <p key={item} className="text-red-500">
                  * {item}
                </p>
              ))}
            {fieldErrors?.link &&
              !touched.link &&
              fieldErrors.link.map((item) => (
                <p key={item} className="text-red-500">
                  * {item}
                </p>
              ))}
            {fieldErrors?.status &&
              !touched.status &&
              fieldErrors.status.map((item) => (
                <p key={item} className="text-red-500">
                  * {item}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          <PrimaryButton className="sm:order-2" type="submit">
            Zapisz
          </PrimaryButton>
          <SecondaryButton
            className="sm:order-1"
            type="button"
            onClick={() => onClose()}
          >
            Anuluj
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
};
export default MeetingForm;

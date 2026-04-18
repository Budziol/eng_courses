"use client";

import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { LevelFormValues } from "@/lib/validators/level";
import { LVL_LEVEL } from "@/utils/records";
import { Lvl } from "@prisma/client";
import { startTransition, useState } from "react";

type Props = {
  userId: string;
  onClose: () => void;
  dispatch: (formData: FormData) => void;
  currentSpeaking?: number;
  currentListening?: number;
  currentReading?: number;
  currentWriting?: number;
  levelId?: string;
  currentLevel?: Lvl;
  fieldErrors?: Record<string, string[]>;
};

type FieldName = keyof LevelFormValues;

const LevelEditForm = ({
  userId,
  onClose,
  dispatch,
  currentSpeaking,
  currentListening,
  currentReading,
  currentWriting,
  levelId,
  currentLevel,
  fieldErrors,
}: Props) => {
  const [speaking, setSpeaking] = useState(currentSpeaking?.toString() ?? "0");
  const [listening, setListening] = useState(
    currentListening?.toString() ?? "0",
  );
  const [reading, setReading] = useState(currentReading?.toString() ?? "0");
  const [writing, setWriting] = useState(currentWriting?.toString() ?? "0");
  const [level, setLevel] = useState<Lvl>(currentLevel ?? "Unknown");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("speaking", speaking);
    formData.append("listening", listening);
    formData.append("reading", reading);
    formData.append("writing", writing);
    formData.append("level", level);

    if (userId) {
      formData.append("userId", userId);
    }
    if (levelId) {
      formData.append("levelId", levelId);
    }

    startTransition(() => {
      dispatch(formData);
    });
  };

  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({
    speaking: false,
    listening: false,
    reading: false,
    writing: false,
    level: false,
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
              <label htmlFor="level">Poziom użytk:</label>
              <select
                id="level"
                name="level"
                value={level}
                onChange={(e) => setLevel(e.target.value as Lvl)}
                className="w-full p-2 border rounded-md"
              >
                {Object.entries(LVL_LEVEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="speaking" className="">
                Mówienie:
              </label>
              <input
                type="number"
                id="speaking"
                name="speaking"
                value={speaking}
                onChange={(e) => setSpeaking(e.target.value)}
                onFocus={(e) => handleTouched(e)}
                min={0}
                max={100}
                className={
                  fieldErrors?.speaking && !touched.speaking
                    ? " border-red-500!"
                    : ""
                }
              />
            </div>
            <div className="w-full">
              <label htmlFor="listening" className="">
                Słuchanie:
              </label>
              <input
                type="number"
                id="listening"
                name="listening"
                value={listening}
                onChange={(e) => setListening(e.target.value)}
                onFocus={(e) => handleTouched(e)}
                min={0}
                max={100}
                className={
                  fieldErrors?.listening && !touched.listening
                    ? " border-red-500!"
                    : ""
                }
              />
            </div>
            <div className="w-full">
              <label htmlFor="reading" className="">
                Czytanie:
              </label>
              <input
                type="number"
                id="reading"
                name="reading"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
                onFocus={(e) => handleTouched(e)}
                min={0}
                max={100}
                className={
                  fieldErrors?.reading && !touched.reading
                    ? " border-red-500!"
                    : ""
                }
              />
            </div>
            <div className="w-full">
              <label htmlFor="writing" className="">
                Pisanie:
              </label>
              <input
                type="number"
                id="writing"
                name="writing"
                value={writing}
                onChange={(e) => setWriting(e.target.value)}
                onFocus={(e) => handleTouched(e)}
                min={0}
                max={100}
                className={
                  fieldErrors?.writing && !touched.writing
                    ? " border-red-500!"
                    : ""
                }
              />
            </div>
          </div>
          <div className="text-[12px]">
            {fieldErrors?.speaking &&
              !touched.speaking &&
              fieldErrors.speaking.map((item) => (
                <p key={item} className="text-red-500">
                  * {item}
                </p>
              ))}
            {fieldErrors?.listening &&
              !touched.listening &&
              fieldErrors.listening.map((item) => (
                <p key={item} className="text-red-500">
                  * {item}
                </p>
              ))}
            {fieldErrors?.reading &&
              !touched.reading &&
              fieldErrors.reading.map((item) => (
                <p key={item} className="text-red-500">
                  * {item}
                </p>
              ))}
            {fieldErrors?.writing &&
              !touched.writing &&
              fieldErrors.writing.map((item) => (
                <p key={item} className="text-red-500">
                  * {item}
                </p>
              ))}
            {fieldErrors?.level &&
              !touched.level &&
              fieldErrors.level.map((item) => (
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
export default LevelEditForm;

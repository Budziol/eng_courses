import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { PrimaryButton } from "../../../../components/Buttons";
import {
  sendActivationCode,
  sendActivationCodeState,
} from "@/app/(auth)/aktywacja/actions/activationCode";
import { AnimatePresence, motion } from "motion/react";

const initialState: sendActivationCodeState = {};

type Props = {
  redirectPath?: string;
};

const ActivationForm = ({ redirectPath }: Props) => {
  const [code, setCode] = useState("");
  const length = 5;

  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const [focus, setFocus] = useState(false);

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const val = e.target.value.replace(/\D/, ""); // tylko cyfry
    if (!val) return;

    const newValues = [...values];
    newValues[i] = val[0];
    setValues(newValues);
    setCode(newValues.join(""));

    // przejdź do następnego inputu jeśli istnieje
    if (i < length - 1) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValues = [...values];
      if (values[i]) {
        newValues[i] = "";
        setValues(newValues);
        setCode(newValues.join(""));
      } else if (i > 0) {
        inputsRef.current[i - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    const newValues = paste
      .split("")
      .concat(Array(length).fill(""))
      .slice(0, length);
    setValues(newValues);
    setCode(newValues.join(""));

    // ustaw focus na ostatni wklejony znak
    const lastIndex = paste.length - 1;
    if (lastIndex < length) inputsRef.current[lastIndex]?.focus();
  };

  const handleFocus = (i: number) => {
    setFocus(true);
  };

  const [state, sendCodeAction, pending] = useActionState(
    sendActivationCode,
    initialState,
  );

  useEffect(() => {
    if (state.fieldErrors) setFocus(false);
  }, [state]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("code", code);

    if (redirectPath) {
      formData.append("redirectPath", redirectPath);
    }

    startTransition(() => {
      sendCodeAction(formData);
    });
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="p-6 pt-0 space-y-4">
        <div className="flex gap-2 justify-center">
          {values.map((val, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el!;
              }}
              name="code"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(i)}
              className={`w-12 h-12 text-center rounded-md text-lg ${values[i] === "" ? "" : "border-main"} ${state.fieldErrors && !focus && "border-red-500"}`}
            />
          ))}
        </div>
        <input type="hidden" name="redirectPath" value={redirectPath} />
      </div>
      <div className="p-6 pt-0">
        <PrimaryButton disabled={pending} className="" type="submit">
          {pending ? "Ładowanie..." : "Wyślij"}
        </PrimaryButton>
      </div>
      <AnimatePresence>
        {state?.formError && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-red-500 text-sm text-center">
              {state.formError}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};
export default ActivationForm;

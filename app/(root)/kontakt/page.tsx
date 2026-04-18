"use client";

import {
  ContactFormState,
  sendContactMail,
} from "@/app/(root)/kontakt/actions/sendContactMail";
import { PrimaryButton } from "@/components/Buttons";
import { PrimaryLink } from "@/components/Links";
import {
  ContactFormValues,
  contactHints,
  contactSchema,
} from "@/lib/validators/contact";
import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { startTransition, useActionState, useEffect, useState } from "react";

const initialState: ContactFormState = {};

type FieldName = keyof ContactFormValues;

const Kontakt = () => {
  const [state, sendContactMailAction, pending] = useActionState(
    sendContactMail,
    initialState,
  );

  useEffect(() => {
    if (!state.errors) return;

    const newErrors: Partial<Record<FieldName, boolean>> = {};

    (Object.keys(state.errors) as string[]).forEach((field) => {
      if (field === "form") return; // pomijamy globalny błąd

      if (["name", "email", "message"].includes(field)) {
        newErrors[field as FieldName] = true;
      }
    });

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));
  }, [state.errors]);

  const [values, setValues] = useState<Partial<Record<FieldName, string>>>({
    name: "",
    email: "",
    message: "",
  });

  const [focused, setFocused] = useState<Partial<Record<FieldName, boolean>>>({
    name: false,
    email: false,
    message: false,
  });

  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setFocused((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const fieldName = name as FieldName;
    const fieldSchema = contactSchema.shape[fieldName];

    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: result.success ? false : true,
    }));

    setFocused((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    let hasError = false;

    const newErrors: Partial<Record<FieldName, boolean>> = {};

    (Object.keys(values) as FieldName[]).forEach((field) => {
      if (!values[field] || values[field]?.trim() === "") {
        newErrors[field] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    startTransition(() => {
      sendContactMailAction(formData);
    });
  };

  return (
    <main className="min-h-screen pt-20 flex">
      <div className="max-w-md mx-auto my-auto space-y-16">
        {/* GLOBALNY FORM ERROR */}
        {state?.errors?.form ? (
          <div className="flex flex-col gap-5 text-center">
            <p className="text-main uppercase tracking-wider font-medium">
              Kontakt
            </p>
            <div className="w-20 h-20 rounded-full flex justify-center items-center bg-red-500/20 mx-auto">
              <X size={64} className="text-red-500" />
            </div>
            <h2 className="text-center">Przykro nam</h2>
            <p>{state.errors.form}</p>
            <PrimaryLink href="/">Powrót</PrimaryLink>
          </div>
        ) : !state?.success ? (
          // FORMULARZ
          <>
            <div className="flex flex-col gap-5">
              <p className="text-main uppercase tracking-wider font-medium text-center">
                Kontakt
              </p>
              <h2 className="text-center">Odezwij się do nas</h2>
              <p className="text-center">
                Nie znalazłeś odpowiedzi w najczęsciej zadawanych pytaniach?
                Użyj formularza kontaktowego a my odezwiemy się najszybciej jak
                to możliwe.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="">
                  Imie
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="twoje imie"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`${errors.name ? "border-red-500" : ""}`}
                />
                <AnimatePresence>
                  {focused.name && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-sub text-sm">
                        - {contactHints.name}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="ty@przykład.com"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`${errors.email ? "border-red-500" : ""}`}
                />
                <AnimatePresence>
                  {focused.email && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-sub text-sm">
                        - {contactHints.email}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="">
                  Wiadomość
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Co ci chodzi po głowie?"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`resize-none overflow-auto ${errors.message ? "border-red-500" : ""}`}
                />
                <AnimatePresence>
                  {focused.message && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-sub text-sm">
                        - {contactHints.message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <PrimaryButton
                disabled={
                  pending || errors.name || errors.email || errors.message
                }
                className="mt-12"
              >
                {pending ? "Wysyłanie..." : "Wyślij"}
              </PrimaryButton>
            </form>
          </>
        ) : (
          // SUCCESS
          <div className="flex flex-col gap-5 text-center">
            <p className="text-main uppercase tracking-wider font-medium">
              Kontakt
            </p>
            <div className="w-20 h-20 rounded-full flex justify-center items-center bg-main/20 mx-auto">
              <Check size={64} className="text-main" />
            </div>
            <h2 className="text-center">Wiadomość wysłana</h2>
            <p>
              Dziękujemy za przesłanie wiadomości, odpiszemy najszybciej jak to
              możliwe.
            </p>
            <PrimaryLink href="/">Powrót</PrimaryLink>
          </div>
        )}
      </div>
    </main>
  );
};
export default Kontakt;

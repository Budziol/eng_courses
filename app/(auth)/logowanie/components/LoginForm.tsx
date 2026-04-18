"use client";

import { login } from "@/app/(auth)/logowanie/actions/loginUser";
import { startTransition, useActionState, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  emailRules,
  LoginFormValues,
  passwordRules,
} from "@/lib/validators/login";
import { Check } from "lucide-react";
import FormHint from "@/components/FormHint";
import { PrimaryButton } from "@/components/Buttons";
import { DefaultLink } from "@/components/Links";

type FieldName = keyof LoginFormValues;

type Props = {
  redirectPath?: string;
};

const LoginForm = ({ redirectPath }: Props) => {
  const [state, loginAction, pending] = useActionState(login, null);

  const [showErrors, setShowErrors] = useState<
    Partial<Record<FieldName, boolean>>
  >({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (state?.errors?.fieldErrors) {
      setShowErrors({
        email: !!state.errors.fieldErrors.email,
        password: !!state.errors.fieldErrors.password,
      });
    }
  }, [state?.errors]);

  const [values, setValues] = useState<Partial<Record<FieldName, string>>>({
    email: "",
    password: "",
  });

  const [valid, setValid] = useState<Partial<Record<FieldName, boolean>>>({
    email: false,
    password: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const isValid = passwordRules.every((rule) => rule.test(value));
      setValid((prev) => ({ ...prev, password: isValid }));
    }

    if (name === "email") {
      const isValid = emailRules.every((rule) => rule.test(value));
      setValid((prev) => ({ ...prev, email: isValid }));
    }
  };

  const [focused, setFocused] = useState<Partial<Record<FieldName, boolean>>>({
    email: false,
    password: false,
  });

  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({
    email: false,
    password: false,
  });

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setFocused((prev) => ({ ...prev, [name]: true }));
    setShowErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setFocused((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    if (redirectPath) {
      formData.append("redirectPath", redirectPath);
    }

    startTransition(() => {
      loginAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="p-6 space-y-4">
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
            className={`${touched.email && !valid.email ? "border-red-500 ring-red-500" : ""} ${showErrors.email ? "border-red-500" : ""}`}
          />
          <AnimatePresence>
            {focused.email && (
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                {emailRules.map((rule) => {
                  const isValid = rule.test(values.email ?? "");

                  return (
                    <li
                      key={rule.id}
                      className={`flex items-center gap-2 text-xs ${
                        isValid ? "text-text-sub" : ""
                      }`}
                    >
                      <FormHint isValid={isValid} />
                      {rule.label}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="">
            Hasło
          </label>
          <input
            name="password"
            type="password"
            placeholder="twoje hasło"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${touched.password && !valid.password ? "border-red-500 ring-red-500" : ""} ${showErrors.password ? "border-red-500" : ""}`}
          />
          <AnimatePresence>
            {focused.password && (
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                {passwordRules.map((rule) => {
                  const isValid = rule.test(values.password ?? "");

                  return (
                    <li
                      key={rule.id}
                      className={`flex items-center gap-2 text-xs ${
                        isValid ? "text-text-sub" : ""
                      }`}
                    >
                      <FormHint isValid={isValid} />
                      {rule.label}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <input type="hidden" name="redirectPath" value={redirectPath} />
      </div>
      {state?.errors.formErrors && (
        <div className="p-6 pt-0">
          <p className="text-red-500 text-sm text-center">
            {state?.errors.formErrors}
          </p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-4 p-6 pt-0">
        <PrimaryButton disabled={pending} className="mt-2" type="submit">
          {pending ? "Ładowanie..." : "Zaloguj"}
        </PrimaryButton>
        <p className="text-sm">
          Nie masz konta?{" "}
          <DefaultLink
            href={redirectPath ? `/rejestracja${redirectPath}` : "/rejestracja"}
          >
            Zarejestruj się
          </DefaultLink>
        </p>
      </div>
    </form>
  );
};
export default LoginForm;

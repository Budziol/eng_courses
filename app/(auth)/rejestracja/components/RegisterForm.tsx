"use client";

import { login } from "@/app/(auth)/logowanie/actions/loginUser";
import { startTransition, useActionState, useEffect, useState } from "react";
import { PrimaryButton } from "../../../../components/Buttons";
import { DefaultLink } from "../../../../components/Links";
import { AnimatePresence, motion } from "motion/react";
import {
  emailRules,
  LoginFormValues,
  passwordRules,
} from "@/lib/validators/login";
import { Check } from "lucide-react";
import { registerUser } from "@/app/(auth)/rejestracja/actions/registerUser";
import {
  lastNameRules,
  nameRules,
  RegisterFormValues,
} from "@/lib/validators/register";
import FormHint from "../../../../components/FormHint";

type FieldName = keyof RegisterFormValues;

type Props = {
  redirectPath?: string;
};

const RegisterForm = ({ redirectPath }: Props) => {
  const [state, registerAction, pending] = useActionState(registerUser, null);

  const [showErrors, setShowErrors] = useState<
    Partial<Record<FieldName, boolean>>
  >({
    name: false,
    lastName: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    if (state?.errors?.fieldErrors) {
      setShowErrors({
        name: !!state.errors.fieldErrors.name,
        lastName: !!state.errors.fieldErrors.lastName,
        email: !!state.errors.fieldErrors.email,
        password: !!state.errors.fieldErrors.password,
      });
    }
  }, [state?.errors]);

  const [values, setValues] = useState<Partial<Record<FieldName, string>>>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [valid, setValid] = useState<Partial<Record<FieldName, boolean>>>({
    name: false,
    lastName: false,
    email: false,
    password: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      const isValid = nameRules.every((rule) => rule.test(value));
      setValid((prev) => ({ ...prev, name: isValid }));
    }
    if (name === "lastName") {
      const isValid = lastNameRules.every((rule) => rule.test(value));
      setValid((prev) => ({ ...prev, lastName: isValid }));
    }
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
    name: false,
    lastName: false,
    email: false,
    password: false,
  });

  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({
    name: false,
    lastName: false,
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
      registerAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="p-6 space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="">
            Imie
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="twoje imie"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${touched.name && !valid.name ? "border-red-500 ring-red-500" : ""} ${showErrors.name ? "border-red-500" : ""}`}
          />
          <AnimatePresence>
            {focused.name && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {nameRules.map((rule) => {
                  const isValid = rule.test(values.name ?? "");

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
          <label htmlFor="lastName" className="">
            Nazwisko
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="twoje nazwisko"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${touched.lastName && !valid.lastName ? "border-red-500 ring-red-500" : ""} ${showErrors.lastName ? "border-red-500" : ""}`}
          />
          <AnimatePresence>
            {focused.lastName && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {lastNameRules.map((rule) => {
                  const isValid = rule.test(values.lastName ?? "");

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
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            id="email"
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
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
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
            id="password"
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
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
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
          Masz konto? <DefaultLink href="/logowanie">Zaloguj się</DefaultLink>
        </p>
      </div>
    </form>
  );
};
export default RegisterForm;

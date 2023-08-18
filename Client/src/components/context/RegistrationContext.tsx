import React, { createContext, useState } from "react";
import {
  useForm,
  UseFormReset,
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noValidateFormProp } from "../../types/registrationTypes";
import { schema, FormInput } from "../../utils/schemas";

interface ContextTypes {
  nextPage?: (fieldName: fieldNames) => Promise<void>;
  reset?: UseFormReset<FormInput>;
  page: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  noValidateData?: noValidateFormProp;
  setNoValidateData?: React.Dispatch<React.SetStateAction<noValidateFormProp>>;
  handleSubmit?: UseFormHandleSubmit<FormInput>;
  register?: UseFormRegister<FormInput>;
  errors?: FieldErrors<FormInput>;
}

type fieldNames =
  | "cardNameSname"
  | "cardNumber"
  | "email"
  | "expiryDate"
  | "password"
  | "securityCode"
  | `cardNameSname.${number}`;

const RegistrationContext = createContext<ContextTypes>({ page: 0 });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    trigger,
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: undefined,
      expiryDate: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const [noValidateData, setNoValidateData] = useState<noValidateFormProp>({
    optInSubscription: false,
    email: "",
    password: "",
    paymentsOffer: 0,
    paymentsProcessing: "creditCard",
  });

  const [page, setPage] = useState<number>(0);

  const nextPage = async (fieldName: fieldNames) => {
    const output = await trigger(fieldName);
    if (output) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        nextPage,
        reset,
        handleSubmit,
        register,
        errors,
        page,
        setPage,
        noValidateData,
        setNoValidateData,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export default RegistrationContext;

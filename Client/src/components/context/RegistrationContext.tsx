import React, { createContext, useState } from "react";
import {
  useForm,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormTrigger,
  UseFormHandleSubmit,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noValidateFormProp } from "../../utils/modules";

// import { z } from "zod";
import { schema, FormInput } from "../../utils/schemas";

// type fieldName =
//   | "email"
//   | "password"
//   | "paymentsOffer"
//   | "cardNameSname"
//   | "cardNumber"
//   | "expiryDate"
//   | "securityCode";

interface ContextTypes {
  page: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  noValidateData?: noValidateFormProp;
  setNoValidateData?: React.Dispatch<React.SetStateAction<noValidateFormProp>>;
  handleSubmit?: UseFormHandleSubmit<FormInput>;
  register?: UseFormRegister<FormInput>;
  errors?: FieldErrors<FormInput>;
  watch?: UseFormWatch<FormInput>;
  trigger?: UseFormTrigger<FormInput>;
}

const RegistrationContext = createContext<ContextTypes>({ page: 0 });

export function FormProvider({ children }: { children: React.ReactNode }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      cardNameSname: "",
      cardNumber: undefined,
      email: "",
      expiryDate: "",
      password: "",
      securityCode: undefined,
    },
    resolver: zodResolver(schema),
  });

  const [noValidateData, setNoValidateData] = useState<noValidateFormProp>({
    optInSubscription: false,
    paymentsOffer: 0,
    paymentsProcessing: "creditCard",
  });

  const [page, setPage] = useState<number>(0);

  return (
    <RegistrationContext.Provider
      value={{
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

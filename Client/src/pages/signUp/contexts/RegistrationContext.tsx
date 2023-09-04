import React, { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noValidateFormProp } from "../../../types/registrationTypes";
import { schema } from "../../../utils/schemas";
import {
  FormInput,
  ContextTypes,
  fieldNames,
} from "../../../types/registrationTypes";

const RegistrationContext = createContext<ContextTypes>({
  page: 0,
  register: null,
});

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

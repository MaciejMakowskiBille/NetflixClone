import React, { createContext, useState } from "react";

import { z, ZodType } from "zod";

interface ContextTypes {
  page: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  data?: FormTypes;
  setData?: React.Dispatch<React.SetStateAction<FormTypes>>;
  onSubmit?: (data: FormTypes) => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick?: () => void;
  schema?: ZodType<FormTypes>;
}

// export const MyGlobalContext = createContext<ContextTypes>({

// page: 0,
// setPage: undefined,
// data: undefined,
// setData: undefined,
// onSubmit: undefined,
// handleChange: () => {},
// schema: undefined,
// });

export interface FormTypes {
  email: string;
  password: string;
  optInSubscription?: boolean;
  paymentsOffer?: number;
  agreement?: boolean;
  paymentsProcessing?: "creditCard" | "payPal";
  cardNameSname?: string;
  cardNumber?: number;
  expiryDate?: string;
  securityCode?: number;
}

const RegistrationContext = createContext<ContextTypes>({
  page: 0,
});

export const schema: ZodType<FormTypes> = z.object({
  email: z
    .string()
    .email("Niepoprawny adres email")
    .nonempty("Adres email jest wymagany"),
  password: z
    .string()
    .min(8, "Hasło musi zawierać minimum 8 znaków")
    .nonempty("Hasło jest wymagane"),
  cardNameSname: z
    .string()
    .nonempty("pole jest wymagane")
    .min(3, "musi zawierać minimum 3 znaków"),
  expireDate: z.date({
    required_error: "Pole jest wymagane",
    // invalid_type_error: "That's not a date!",
  }),
});

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormTypes>({
    email: "",
    password: "",
    optInSubscription: false,
    agreement: false,
    paymentsOffer: undefined,
    paymentsProcessing: "creditCard",
    cardNameSname: "",
    cardNumber: undefined,
    expiryDate: undefined,
    securityCode: undefined,
  });

  const [page, setPage] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = event.target.type;

    const inputName = event.target.name;
    // console.log(inputType);
    // console.log(inputName);

    const value =
      inputType === "checkbox" ? event.target.checked : event.target.value;

    setData((prev) => ({
      ...prev,
      [inputName]: value,
    }));
  };

  const handleClick = () => {
    // jeżeli walidacja ok
    if (setPage) {
      setPage((prev) => prev + 1);
    }
  };

  const onSubmit = (data: FormTypes) => {
    console.log(JSON.stringify(data));
    if (setPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    // <>{children}</>
    <RegistrationContext.Provider
      value={{
        page,
        setPage,
        data,
        setData,
        onSubmit,
        handleChange,
        schema,
        handleClick,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export default RegistrationContext;

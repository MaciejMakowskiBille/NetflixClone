import React, { createContext, useState } from "react";

import { z, ZodType } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ContextTypes {
  page: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  data?: FormTypes;
  setData?: React.Dispatch<React.SetStateAction<FormTypes>>;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

interface FormTypes {
  email: string;
  password: string;
  optInSubscription: boolean;
  paymentsOffer?: "creditCard" | "payPal";
  paymentsProcessing?: number;
  cardNameSname?: string;
  cardNumber?: number;
  expiryDate?: string;
  securityCode?: number;
}

const RegistrationContext = createContext<ContextTypes>({
  page: 0,
});

export function FormProvider({ children }: { children: React.ReactNode }) {
  const schema: ZodType<FormTypes> = z.object({
    email: z
      .string()
      .email("Niepoprawny adres email")
      .nonempty("Adres email jest wymagany"),
    password: z
      .string()
      .min(8, "Hasło musi zawierać minimum 8 znaków")
      .nonempty("Hasło jest wymagane"),
    optInSubscription: z.boolean(),
    // paymentsOffer: z.undefined({message: "pole jest wymagane"});
    cardNameSname: z
      .string()
      .nonempty("pole jest wymagane")
      .min(3, "musi zawierać minimum 3 znaków"),
    expireDate: z.date({
      required_error: "Pole jest wymagane",
      // invalid_type_error: "That's not a date!",
    }),
  });

  //   const {register, handleSubmit} = useForm({ resolver: zodResolver(schema) });

  const [data, setData] = useState<FormTypes>({
    email: "",
    password: "",
    optInSubscription: false,
  });

  const [page, setPage] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = event.target.type;

    const inputName = event.target.name;

    const value =
      inputType === "checked" ? event.target.checked : event.target.value;

    setData((prev) => ({
      ...prev,
      [inputName]: value,
    }));
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    // <>{children}</>
    <RegistrationContext.Provider
      value={{ page, setPage, data, setData, onSubmit, handleChange, schema }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export default RegistrationContext;

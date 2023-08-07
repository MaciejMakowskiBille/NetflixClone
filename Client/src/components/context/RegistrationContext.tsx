import React, { createContext, useState } from "react";
import {
  useForm,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormTrigger,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z, ZodType } from "zod";

type fieldName =
  | "email"
  | "password"
  | "optInSubscription"
  | "paymentsOffer"
  | "agreement"
  | "paymentsProcessing"
  | "cardNameSname"
  | "cardNumber"
  | "expiryDate"
  | "securityCode";

interface ContextTypes {
  page: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  data?: FormTypes;
  setData?: React.Dispatch<React.SetStateAction<FormTypes>>;
  onSubmit?: (data: FormTypes) => void;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick?: (fieldName: fieldName) => Promise<void>;
  schema?: ZodType<FormTypes>;
  register?: UseFormRegister<FormTypes>;
  errors?: FieldErrors<FormTypes>;
  watch?: UseFormWatch<FormTypes>;
  trigger?: UseFormTrigger<FormTypes>;
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
    .nonempty("Email jest wymagany"),
  password: z
    .string()
    .nonempty("Hasło jest wymagane")
    .min(8, "Hasło musi zawierać minimum 8 znaków"),
  cardNameSname: z
    .string()
    .nonempty("pole jest wymagane")
    .min(3, "musi zawierać minimum 3 znaków"),
  expireDate: z.string().regex(/^\d\d\/\d\d/, "nie właściwy wzorzec!"),
  securityCode: z.number().max(3, "nie właściwy wzorzec!"),
});

export type FormInput = z.infer<typeof schema>;

export function FormProvider({ children }: { children: React.ReactNode }) {
  const {
    watch,
    register,
    trigger,
    formState: { errors },
  } = useForm<FormTypes>({ resolver: zodResolver(schema) });

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

  const handleClick = async (fieldName: fieldName) => {
    const output = await trigger(fieldName);
    console.log(output);
    // if (output) {
    //   setPage!((prev) => prev + 1);
    // }
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
        trigger,
        register,
        errors,
        watch,
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

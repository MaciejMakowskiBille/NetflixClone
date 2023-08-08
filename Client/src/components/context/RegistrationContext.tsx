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

import { z } from "zod";
const cardNumberRegex =
  "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$";
type fieldName =
  | "email"
  | "password"
  | "paymentsOffer"
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
  handleClick?: (fieldName: fieldName) => void;
  handleSubmit?: UseFormHandleSubmit<FormInput>;
  schema?: z.ZodSchema<FormInput>;
  register?: UseFormRegister<FormInput>;
  errors?: FieldErrors<FormInput>;
  watch?: UseFormWatch<FormInput>;
  trigger?: UseFormTrigger<FormInput>;
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
  paymentsProcessing?: "creditCard" | "payPal";
  cardName?: string;
  cardSname?: string;
  cardNumber?: string;
  expiryDate?: string;
  securityCode?: number;
}

const RegistrationContext = createContext<ContextTypes>({
  page: 0,
});

export const schema = z.object({
  email: z
    .string()
    .email("Niepoprawny adres email")
    .nonempty("Email jest wymagany"),
  password: z
    .string()
    .nonempty("Hasło jest wymagane")
    .min(8, "Hasło musi zawierać minimum 8 znaków"),
  paymentsOffer: z.number(),
  cardNameSname: z
    .string()
    .nonempty("pole jest wymagane")
    .min(3, "musi zawierać minimum 3 znaków"),
  cardNumber: z
    .string()
    .min(16, "numer musi zawierać conajmniej 16 znaków")
    .regex(new RegExp(cardNumberRegex), "nieprawidłowy numer karty"),
  expiryDate: z
    .string()
    .nonempty("pole jest wymagane")
    .regex(/^\d\d\/\d\d$/, "nie właściwy wzorzec!")
    .refine((value) => {
      const date = new Date();
      const year = +date.getFullYear().toString().slice(2);
      console.log("year", year);
      let month = date.getMonth() + 1;
      const inputMonth = Number(value.slice(0, 2));
      const inputYear = +value.slice(3);
      console.log("input year", inputYear);
      if (inputMonth > 12) return false;
      if (year == inputYear) {
        return month < inputMonth;
      } else {
        return year < inputYear;
      }
    }, "karta jest nieważna"),
  securityCode: z.coerce
    .string()
    .length(3, "kod musi zawierać trzy cyfry")
    .refine((value) => !isNaN(Number(value)), "pole jest wymagane"),
  // .refine((value) => typeof value == typeof NaN, "pole jest wymagane")
});

export type FormInput = z.infer<typeof schema>;

// function validateUser(user: FormInput, schema: z.ZodSchema<FormInput>) {
//   return schema.parse(user);
// }

export function FormProvider({ children }: { children: React.ReactNode }) {
  const {
    // clearErrors,
    handleSubmit,
    watch,
    register,
    trigger,
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
      paymentsOffer: 0,
      securityCode: "",
    },
    resolver: zodResolver(schema),
  });

  const [data, setData] = useState<FormTypes>({
    email: "",
    password: "",
    optInSubscription: false,
    paymentsOffer: 0,
    paymentsProcessing: "creditCard",
    cardName: "",
    cardSname: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: 0,
  });

  const [page, setPage] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = event.target.type;

    const inputName = event.target.name;
    // console.log(inputType);
    // console.log(inputName);

    const value =
      inputType === "checkbox" ? event.target.checked : event.target.value;

    if (inputName === "securityCode") {
      setData((prev) => ({
        ...prev,
        [inputName]: Number(value),
      }));
    }
    // console.log(typeof Number(event.target.value) === typeof NaN);

    if (inputName === "cardNameSname") {
      const values = event.target.value.split(" ");
      setData((prev) => ({
        ...prev,
        ["cardName"]: values[0],
        ["cardSname"]: values[1],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [inputName]: value,
      }));
    }
  };

  const handleClick = (fieldName: fieldName) => {
    // const output = await trigger(fieldName);
    // console.log(output);
    if (!errors[fieldName]) {
      setPage!((prev) => prev + 1);
    }
    // console.log(errors[fieldName]);
    // setPage!((prev) => prev + 1);
  };

  const onSubmit = (data: FormTypes) => {
    console.log(JSON.stringify(data));
    // if (setPage) {
    //   setPage((prev) => prev + 1);
    // }
  };

  return (
    // <>{children}</>
    <RegistrationContext.Provider
      value={{
        handleSubmit,
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

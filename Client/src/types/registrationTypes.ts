import {
  UseFormReset,
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

export type UserTypes = {
  email: string;
  password: string;
  optInSubscription?: boolean;
  username: string;
}

export type UserPaymentTypes = {
  user: UserTypes;
  payment: paymentsTypes;
}

export type UserPostResponseTypes = {
  jwt: string;
  user: {
    id: number;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    optInSubscription: boolean;
    username: string;
  };
}

export type noValidateFormProp = {
  email: string;
  password: string;
  optInSubscription?: boolean;
  paymentsOffer?: number;
  paymentsProcessing?: "creditCard" | "payPal";
}

export type userCreationErrorType = {
  fieldName: string;
  error: string;
}

export type paymentsTypes = {
  data: {
    cardName?: string;
    cardSname?: string;
    cardNumber?: string;
    securityCode?: number | string;
    expiryDate?: string;
    paymentsOffer: number;
    paymentsProcessing: "creditCard" | "payPal";
    user: number;
  };
}

export type paymentsResponseTypes = {
  attributes: {
    cardName: string;
    cardSname: string;
    cardNumber: string;
    securityCode: number;
    expiryDate: string;
    paymentsOffer: number;
    paymentsProcessing: "creditCard" | "payPal";
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export type displayArray = {
  [index: number]: JSX.Element;
}

export type modalTypes = {
  success?: boolean;
  content?: string;
}

export type profileTypes = {
  data: {
    username: string;
    ageGroup: "kid" | "teen" | "adult";
    favorite_series?: string[];
    favorite_films?: string[];
    user: number;
  };
}

export type fieldNames =
  | "cardNameSname"
  | "cardNumber"
  | "email"
  | "expiryDate"
  | "password"
  | "securityCode"
  | `cardNameSname.${number}`;

export type FormInput = {
  cardNameSname: string[];
  cardNumber: string;
  email: string;
  expiryDate: string;
  password: string;
  securityCode: string | number;
}

export type ContextTypes = {
  nextPage?: (fieldName: fieldNames) => Promise<void>;
  reset?: UseFormReset<FormInput>;
  page: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  noValidateData?: noValidateFormProp;
  setNoValidateData?: React.Dispatch<React.SetStateAction<noValidateFormProp>>;
  handleSubmit?: UseFormHandleSubmit<FormInput>;
  register: UseFormRegister<FormInput> | null;
  errors?: FieldErrors<FormInput>;
};

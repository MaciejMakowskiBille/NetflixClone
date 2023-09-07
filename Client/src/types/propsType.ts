import {
  UseFormReset,
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

type FormsType = SignInType | FormInput;

export type PasswordProps = {
  passwordShown: boolean;
  setPasswordShown: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<any> | null;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  errors: FieldErrors<FormsType> | undefined;
};

export type fieldNames =
  | "cardNameSname"
  | "cardNumber"
  | "email"
  | "expiryDate"
  | "password"
  | "securityCode"
  | `cardNameSname.${number}`;

export type ContextType = {
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

export type DisplayedPagesObjectType = {
  [index: number]: JSX.Element;
};

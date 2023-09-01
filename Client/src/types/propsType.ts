import { UseFormRegister, FieldErrors } from "react-hook-form";

export type PasswordProps = {
    passwordShown: boolean;
    setPasswordShown: React.Dispatch<React.SetStateAction<boolean>>;
    register: UseFormRegister<FormInput> | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    errors: FieldErrors<FormInput> | undefined;
  };
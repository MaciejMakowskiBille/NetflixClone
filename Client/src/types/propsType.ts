import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import { loginTypes } from "../utils/schemas";
import { FormInput } from "./registrationTypes";

// interface FormInput extends FieldValues {
//     cardNameSname: string[];
//     cardNumber: string;
//     email: string;
//     expiryDate: string;
//     password: string;
//     securityCode: string | number;
// };

// interface LoginTypes extends FieldValues {
//     login: string;
//     password: string;
// }

export type PasswordProps = {
    passwordShown: boolean;
    setPasswordShown: React.Dispatch<React.SetStateAction<boolean>>;
    register: (UseFormRegister<FormInput> | null ) | (UseFormRegister<{ email: string; password: string; }>| null);
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    errors: FieldErrors<FormInput> | undefined;
  };


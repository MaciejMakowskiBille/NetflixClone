import { z } from "zod";

const cardNumberRegex =
  "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$";

const expiryDateValid = (value: string): boolean => {
  const date = new Date();
  const year = +date.getFullYear().toString().slice(2);
  let month = date.getMonth() + 1;
  const inputMonth = Number(value.slice(0, 2));
  const inputYear = +value.slice(3);
  if (inputMonth > 12) return false;
  if (year == inputYear) {
    return month < inputMonth;
  } else {
    return year < inputYear;
  }
};

export const schema = z.object({
  email: z
    .string()
    .trim()
    .email("Niepoprawny adres email")
    .nonempty("Pole jest wymagany"),
  password: z
    .string()
    .trim()
    .nonempty("Pole jest wymagane")
    .min(8, "Musi zawierać conajmniej 8 znaków"),
  cardNameSname: z
    .string()
    .trim()
    .nonempty("Pole jest wymagane")
    .min(3, "Musi zawierac trzy znaki")
    .transform((value) => value.split(" ")),
  cardNumber: z
    .string()
    .length(16, "Musi zawierać 16 znaków")
    .regex(new RegExp(cardNumberRegex), "Nieprawidłowy numer karty"),
  expiryDate: z
    .string().trim()
    .nonempty("pole jest wymagane")
    .regex(/^\d\d\/\d\d$/, "Wpisz według wzorca: DD/RR")
    .refine(expiryDateValid, "Karta jest nieważna"),
  securityCode: z.coerce
    .string()
    .length(3, "Kod musi zawierać trzy cyfry")
    .refine((value) => !isNaN(Number(value)), "pole jest wymagane")
    .transform((value) => parseInt(value)),
});

export type FormInput = z.infer<typeof schema>;

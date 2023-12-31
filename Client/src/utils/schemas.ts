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
    .min(3, "Musi zawierac trzy znaki")
    .transform((value) => value.split(" ")),
  cardNumber: z
    .string()
    .length(16, "Musi zawierać 16 znaków")
    .regex(new RegExp(cardNumberRegex), "Nieprawidłowy numer karty"),
  expiryDate: z
    .string().trim()
    .regex(/^\d\d\/\d\d$/, "Wpisz według wzorca: DD/RR")
    .refine(expiryDateValid, "Karta jest nieważna"),
  securityCode: z
    .string()
    .length(3, "Kod musi zawierać trzy cyfry")
    .refine((value) => !isNaN(Number(value)), "pole jest wymagane")
    .transform((value) => parseInt(value)),
});


export const loginSchema = z.object({
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
});

const phoneRegex = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,5}$";

// export const settingsSchema = z.object({
//   currentPassword: z.string().min(9, "wprowadź poprawną wartość").optional(),
//   password: z.string().min(9, "wprowadź poprawną wartość").optional(),
//   email: z.string().email("niepoprawna wartość").optional().transform(e => e === '' ? undefined : e),
//   phoneNumber: z.string().regex(new RegExp(phoneRegex), "niewłaściwa wartość").optional().transform(e => e === '' ? undefined : e),
// })

export const settingsSchema = z.object({
  currentPassword: z.string().min(9, "wprowadź poprawną wartość").nullable(),
  password: z.string().min(9, "wprowadź poprawną wartość").nullable(),
  email: z.string().email("niepoprawna wartość").nullable().transform(e => e === '' ? null : e),
  phoneNumber: z.string().regex(new RegExp(phoneRegex), "niewłaściwa wartość").nullable().transform(e => e === '' ? null : e),
})

// export type SettingsFormType = z.infer<typeof settingsSchema>;
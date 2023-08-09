import {z} from "zod";

const cardNumberRegex =
  "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$";

export const schema = z.object({
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
      .refine((value) => !isNaN(Number(value)), "pole jest wymagane").transform(value=>{
        const parsed = parseInt(value);
        return parsed;
      }),
  });

  export type FormInput = z.infer<typeof schema>;
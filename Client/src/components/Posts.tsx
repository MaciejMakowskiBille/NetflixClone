import axios, { AxiosError } from "axios";
import { FormTypes, UserCreationErrorType } from "../utils/modules";

const authURL = "http://localhost:1337/api/auth";

interface UserTypes extends FormTypes {
  createdAt: string;
  updatedAt: string;
}

interface ResponseTypes {
  jwt: string;
  user: UserTypes;
}

// export async function CreateUser(data: FormTypes) {
// const output = await axios
//   .post(authURL + `/local/register`, data)
//   .then((response: { data: { jwt: string; user: CreateUserResponse } }) => {
//     // console.log("success", response.data.user);
//     return response.data;
//   })
//
// return output;
// }

// export async function CreateUser(inputData: FormTypes) {
//   try {
//     const { data, status } = await axios.post<ResponseTypes>(
//       authURL + `/local/register`,
//       inputData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );
//     localStorage.setItem("jwt", data.jwt);
//     console.log(JSON.stringify(data));
//     console.log(status);
//     return { data, status };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("error message: ", error.message);
//       const err = new Error("Nieoczekiwnay błąd", { cause: reason });

//       if (error.response) {
//         console.log('Response data: ', error.response.data);
//         console.log('Response status: ', error.response.status);
//       }
//       // 👇️ error: AxiosError<any, any>
//       throw error.message;
//     } else {
//       console.log("unexpected error: ", error);
//       throw "An unexpected error occurred";
//     }
//   }
// }

export async function CreateUser(data: FormTypes) {
  return await axios
    .post<ResponseTypes>(authURL + `/local/register`, data)
    .then((response) => response.data as ResponseTypes)
    .catch((err: AxiosError<UserCreationErrorType[]>) => {
      console.log("err", err);
      // if (err.response?.status === 400) {
      //   // const error = new Error();
      //   console.log("taki użytkownik już istnieje!");
      // } else {
      //   console.log("nieoczekiwany błąd!");
      // }
      // console.log("nieoczekiwany błąd!");
      // return err.message;
    });
  // .catch((err) => err);
}

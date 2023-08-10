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
//   .catch((err: AxiosError<UserCreationErrorType[]>) => {
//     if (err.response?.status === 400) {
//       console.log("taki użytkownik już istnieje!");
//     } else {
//       console.log("nieoczekiwany błąd!");
//     }
//     return err.message;
//   });
// return output;
// }

export async function CreateUser(inputData: FormTypes) {
  try {
    const { data, status } = await axios.post<ResponseTypes>(
      authURL + `/local/register`,
      inputData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    localStorage.setItem("jwt", data.jwt);
    console.log(JSON.stringify(data));
    console.log(status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

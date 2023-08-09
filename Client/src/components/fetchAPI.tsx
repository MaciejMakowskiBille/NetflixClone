import axios, { AxiosError } from "axios";
import { FormTypes, UserCreationErrorType } from "../utils/modules";

const authURL = "http://localhost:1337/api/auth";

interface CreateUserResponse extends FormTypes {
  //   jwt: string;
  createdAt: string;
  updatedAt: string;
}

export function CreateUser(data: FormTypes) {
  axios
    .post(authURL + `/local/register`, data)
    .then((response: { data: { jwt: string; user: CreateUserResponse } }) => {
      return response.data.user;
    })
    .catch((err: AxiosError<UserCreationErrorType[]>) => {
      if (err.response?.status === 400) {
        console.log("taki użytkownik już istnieje!");
      }
    });
}

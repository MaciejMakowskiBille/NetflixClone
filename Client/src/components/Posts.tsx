import axios, { AxiosError } from "axios";
import { FormTypes } from "../utils/modules";

const authURL = "http://localhost:1337/api/auth";

interface UserTypes extends FormTypes {
  createdAt: string;
  updatedAt: string;
}

interface ResponseTypes {
  jwt: string;
  user: UserTypes;
}

// export function CreateUser(data: FormTypes){

// }

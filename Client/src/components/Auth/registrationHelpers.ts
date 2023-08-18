import axios, {isAxiosError} from "axios";
import { paymentsTypes, paymentsResponseTypes, UserPostResponseTypes, UserTypes} from "../../utils/registrationTypes";
import { loginTypes } from "../../utils/schemas";

const authURL = "http://localhost:3001/api/auth";

const URL = "http://localhost:3001/api";


export async function signIn(data: loginTypes){
    try {
    const response = await axios
      .post('http://localhost:3001/api/auth/local', {
        identifier: data.email,
        password: data.password,
      });
    return response.data as UserPostResponseTypes;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Wprowadzono nieprawidłowe dane");
      } else {
        throw new Error("Wystąpił nieoczekiwny błąd");
      }

    }
    throw new Error("Wystąpił nieoczekiwny błąd");
  }  
}

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

export const postUser = async (endpoint: string, data: UserTypes) => {
  try {
    const response = await axios.post(authURL + endpoint, data);
    localStorage.setItem("jwt", response.data.jwt);
    setAuthToken(response.data.jwt);
    return response.data as UserPostResponseTypes;
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 400) {
        throw new Error("Użytkownik o takim emailu już istnieje.\nSpróbuj ponownie!");
      }else{
        throw new Error("Nieoczekiwany błąd. \nSpróbuj ponownie!");
      }
    } else {
      throw new Error("Nieoczekiwany błąd. \nSpróbuj ponownie!");
    }
  }
};

export function postPayment(endpoint: string, data: paymentsTypes){
  const response = axios.post(URL + endpoint, data).then(response=>response.data.data as paymentsResponseTypes).catch(err=>{throw new Error(err)});
  return response;
}
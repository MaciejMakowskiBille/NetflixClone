import axios, {isAxiosError} from "axios";
import { UserPostResponseTypes} from "../types/registrationTypes";
import { loginTypes } from "./schemas";
import { apiURL, authURL} from "./links";


export async function signIn(data: loginTypes){
    try {
    const response = await axios
      .post(authURL+ 'local', {
        identifier: data.email,
        password: data.password,
      });
    return response.data as UserPostResponseTypes;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Wprowadzono nieprawidłowe dane");
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

export const postUser = async (data: CreateUserType) => {
  try {
    const response = await axios.post(apiURL + "user/post", data);
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

// export function postPayment(endpoint: string, data: paymentsTypes){
//   const response = axios.post(apiURL + endpoint, data).then(response=>response.data.data as paymentsResponseTypes).catch(err=>{throw new Error("Wystąpił nieoczekiwany błąd:\n"+err)});
//   return response;
// }

// export function postProfile(endpoint: string, data: profileTypes){
//   const response = axios.post(apiURL + endpoint, data).then(response=>response.data.data).catch(err=>{throw new Error("Wystąpił nieoczekiwany błąd:\n"+err)});
//   return response;
// }
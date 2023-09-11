import axios, {isAxiosError} from "axios";
import { apiURL, authURL} from "./links";

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};


export async function signIn(data: SignInType){
    try {
    const response = await axios
      .post(authURL+ 'local', {
        identifier: data.email,
        password: data.password,
      });
    localStorage.setItem("jwt", response.data.jwt);
    setAuthToken(response.data.jwt);
    return response.data as UserPostResponseType;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Wprowadzono nieprawidłowe dane");
      } 
    }
    throw new Error("Wystąpił nieoczekiwny błąd");
  }  
}



export const postUser = async (data: CreateUserType) => {
  try {
    const response = await axios.post(apiURL + "user/post", data);
    localStorage.setItem("jwt", response.data.jwt);
    setAuthToken(response.data.jwt);
    return response.data as UserPostResponseType;
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
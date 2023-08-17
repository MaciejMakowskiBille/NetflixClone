import axios, {isAxiosError} from "axios";
import { paymentsTypes, paymentsResponseTypes, UserPostResponseTypes, UserTypes} from "../../utils/modules";
import { loginTypes } from "../../utils/schemas";

const authURL = "http://localhost:3001/api/auth";

const URL = "http://localhost:3001/api";


export function signIn(data: loginTypes){
    return axios
    .post('http://localhost:3001/api/auth/local', {
      identifier: data.email,
      password: data.password,
    })
    .then(response => {
    //   console.log('User profile', response.data.data.user);
    //   console.log('User token', response.data.data.jwt);
      return response.data as UserPostResponseTypes;
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });  
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
      }
    } else {
      throw new Error("Nieoczekiwany błąd. \nSpróbuj ponownie!");
    }
  }
};

export function postPayment(endpoint: string, data: paymentsTypes){
  const response = axios.post(URL + endpoint, data).then(response=>response.data.data as paymentsResponseTypes).catch(err=>console.log(err))
  return response;
}
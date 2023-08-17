import axios from "axios";
import { paymentsTypes, paymentsResponseTypes, UserPostResponseTypes} from "../../utils/modules";
import { loginTypes } from "../../utils/schemas";

export function postPayment(data: paymentsTypes){
    const response = axios.post("http://localhost:3001/api/payments", data).then(response=>response.data.data as paymentsResponseTypes).catch(err=>console.log(err))
    return response;
}

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
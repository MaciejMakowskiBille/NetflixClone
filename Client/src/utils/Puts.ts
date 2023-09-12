import axios from "axios";
import { setAuthToken } from "./Posts";
import { apiURL, authURL } from "./links";

export const putUserData = async (data: putUserType) => {
  const response = await axios
    .put(apiURL+ "user/me", data)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
  return response.data as PutUserResponseType;
};


export const changePassword = async (data: ChangePasswordType) => {
    const response = await axios.post(authURL + "change-password", data).then((response) => {
      localStorage.setItem("jwt", response.data.jwt);
      setAuthToken(response.data.jwt);
      return response;
    })
    .catch((error) => {
      throw error;
    });

    
    return response.data as UserPostResponseType;
};

import axios, { isAxiosError } from "axios";
import { setAuthToken } from "./Posts";
import { apiURL, authURL } from "./links";

export const putUserData = async (data: putUserType) => {
  const keys = Object.keys(data);
  const key = keys[0];
  setAuthToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImlhdCI6MTY5Mzk5MDY5NCwiZXhwIjoxNjk2NTgyNjk0fQ.qmu0XctCbmLVmVc8d1nBJS9dJ7tWo0P5L7CNB558EwA"
  );
  const response = await axios
    .put("http://localhost:3001/api/user/me", data)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
  return response.data as PutUserResponseType;
};


export const changePassword = async (data: ChangePasswordType) => {
    setAuthToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImlhdCI6MTY5Mzk5MDY5NCwiZXhwIjoxNjk2NTgyNjk0fQ.qmu0XctCbmLVmVc8d1nBJS9dJ7tWo0P5L7CNB558EwA"
      );
      const response = await axios.post(authURL + "change-password", data).then((response) => response)
      .catch((error) => {
        throw new Error(error);
      });
    return response.data as UserPostResponseType;
};

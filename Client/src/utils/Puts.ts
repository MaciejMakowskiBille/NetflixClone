import axios from "axios"

export const putUserData = async (data: putUserType) => {
    const response =  await axios.put("http://localhost:3001/api/user/me", data).then((response) => response).catch((err)=>err);
    return response as PutUserResponseType;
}
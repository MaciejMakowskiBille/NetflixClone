import axios from "axios"
import { apiURL } from "./links";

export const removeProfile = async (profileId: number) => {
    const token = localStorage.getItem("jwt");
    return await axios.delete(apiURL+"profiles/"+profileId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => response.data as RemoveProfileResponseType).catch(err => {throw err});
} 
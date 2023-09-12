import axios from "axios"
import { apiURL } from "./links";

export const removeProfile = async (profileId: number) => {
    return await axios.delete(apiURL+"profiles/"+profileId).then(response => response.data as RemoveProfileResponseType).catch(err => {throw err});
} 
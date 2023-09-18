import { apiURL } from "./links";
import instance from "./axiosInstance";

export const removeProfile = async (profileId: number) => {
    return await instance.delete(apiURL+"profiles/"+profileId).then(response => response.data as RemoveProfileResponseType).catch(err => {throw err});
} 
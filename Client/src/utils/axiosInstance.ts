import axios from "axios";
import { apiURL } from "./links";
import { refreshToken} from "./helpers";

const instance = axios.create({
  baseURL: apiURL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 403 || error.response.status == 401) {
        refreshToken();
    }
  }
);

export default instance;

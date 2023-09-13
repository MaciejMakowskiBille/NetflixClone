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

export const addFavoriteMovie = async (profileId: number, movieId: number) => {
    const response = await axios.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_films: {
                connect: [movieId],
            }
        }
    })

    return response;
}

export const removeFavoriteMovie = async (profileId: number, movieId: number) => {
    const response = await axios.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_films: {
                disconnect: [movieId],
            }
        }
    })

    return response;
}

export const addFavoriteSeries = async (profileId: number, seriesId: number) => {
    const response = await axios.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_series: {
                connect: [seriesId],
            }
        }
    })

    return response;
}

export const removeFavoriteSeries = async (profileId: number, seriesId: number) => {
    const response = await axios.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_series: {
                disconnect: [seriesId],
            }
        }
    })

    return response;
}


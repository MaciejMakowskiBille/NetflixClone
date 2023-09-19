import { apiURL, authURL } from "./links";
import instance from "./axiosInstance";
import { setUserSession } from "./helpers";

export const putUserData = async (data: putUserType) => {
  const response = await instance
    .put(apiURL+ "user/me", data)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
  return response.data as PutUserResponseType;
};


export const changePassword = async (data: ChangePasswordType) => {
    const response = await instance.post(authURL + "change-password", data).then((response) => {
      localStorage.setItem("jwt", response.data.jwt);
      setUserSession(response.data.jwt, response.data.user.id);
      return response;
    })
    .catch((error) => {
      throw error;
    });

    
    return response.data as UserPostResponseType;
};

export const addFavoriteMovie = async (profileId: number, movieId: number) => {
    const response = await instance.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_films: {
                connect: [movieId],
            }
        }
    })

    return response;
}

export const removeFavoriteMovie = async (profileId: number, movieId: number) => {
    const response = await instance.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_films: {
                disconnect: [movieId],
            }
        }
    })

    return response;
}

export const addFavoriteSeries = async (profileId: number, seriesId: number) => {
    const response = await instance.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_series: {
                connect: [seriesId],
            }
        }
    })

    return response;
}

export const removeFavoriteSeries = async (profileId: number, seriesId: number) => {
    const response = await instance.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_series: {
                disconnect: [seriesId],
            }
        }
    })

    return response;
}


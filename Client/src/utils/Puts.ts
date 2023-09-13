import axios from "axios"
import { apiURL } from "./links"

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
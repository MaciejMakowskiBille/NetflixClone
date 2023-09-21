import axios from 'axios';
import { apiURL } from './links';
import {
    clearCategoryData,
    clearMovieData,
    clearProducerData,
    clearSeriesData,
    clearSliderData,
} from './helpers';
import { setAuthToken } from './Posts';

const getBothTypes = async (seriesURL: string, moviesURL: string) => {
    let movies: CombinedDataType = [];
    const responseS = await axios.get(apiURL + seriesURL);
    if (responseS && responseS.data.data) {
        const data: SeriesResponseType[] = responseS.data.data;
        const clearedData: SeriesDataType[] = data.map((item) => {
            return clearSeriesData(item);
        });
        movies = movies.concat(clearedData);
    }
    const responseM = await axios.get(apiURL + moviesURL);
    if (responseM && responseM.data.data) {
        const data: MovieResponseType[] = responseM.data.data;
        const clearedData: MovieDataType[] = data.map((item) => {
            return clearMovieData(item);
        });
        movies = movies.concat(clearedData);
    }
    return movies;
};

export const getFilms = async (): Promise<MovieDataType[] | null> => {
    const response = await axios.get(apiURL + `films?populate=deep&?`);
    if (response && response.data.data) {
        const data: MovieResponseType[] = response.data.data;
        const clearedData: MovieDataType[] = data.map((item) => {
            return clearMovieData(item);
        });
        return clearedData;
    } else {
        return null;
    }
};

export const getOneFilm = async (id: number): Promise<MovieDataType | null> => {
    const response = await axios.get(apiURL + `films/${id}?populate=deep`);
    if (response && response.data.data) {
        return clearMovieData(response.data.data);
    } else {
        return null;
    }
};

export const getSeries = async () => {
    const response = await axios.get(apiURL + `series?populate=deep`);
    if (response && response.data.data) {
        const data: SeriesResponseType[] = response.data.data;
        const clearedData: SeriesDataType[] = data.map((item) => {
            return clearSeriesData(item);
        });
        return clearedData;
    } else {
        return null;
    }
};
export const getOneSeries = async (
    id: number
): Promise<SeriesDataType | null> => {
    const response = await axios.get(apiURL + `series/${id}?populate=deep`);
    if (response && response.data.data) {
        return clearSeriesData(response.data.data);
    } else {
        return null;
    }
};

export const getCategories = async (): Promise<Category[] | null> => {
    const response = await axios.get(apiURL + `categories`);
    if (response && response.data.data) {
        return clearCategoryData(response.data.data);
    } else {
        return null;
    }
};

export const getSlider = async () => {
    const response = await axios.get(apiURL + 'sliders?populate=deep');
    if (response && response.data.data) {
        const data: SliderResponseType[] = response.data.data;
        const clearedData: Slide[] = data.map((item) => {
            return clearSliderData(item);
        });
        return clearedData;
    } else {
        return null;
    }
};

export const getAllTypeMoviesByCategory = async (
    category: string,
    id: number
) => {
    const series = `series/?populate=deep&filters[categories][name][$eq]=${category}&filters[id][$ne]=${id}`;
    const movies = `films/?populate=deep&filters[categories][name][$eq]=${category}&filters[id][$ne]=${id}`;
    return getBothTypes(series, movies);
};

export const getProducersLimit = async (
    limit: number
): Promise<Producer[] | null> => {
    const response = await axios.get(
        apiURL + `producers/?populate=deep&pagination[limit]=${limit}`
    );
    if (response && response.data.data) {
        const data: ProducerResponseType[] = response.data.data;
        const clearedData = data.map((producer) => {
            return clearProducerData(producer);
        });
        return clearedData;
    } else {
        return null;
    }
};

export const getProducers = async (): Promise<Producer[] | null> => {
    const response = await axios.get(apiURL + `producers/?populate=deep`);
    if (response && response.data.data) {
        const data: ProducerResponseType[] = response.data.data;
        const clearedData = data.map((producer) => {
            return clearProducerData(producer);
        });
        return clearedData;
    } else {
        return null;
    }
};
export const getAllTypeMoviesByProducer = async (producer: string) => {
    const series = `series/?populate=deep&filters[producer][name][$eq]=${producer}`;
    const movies = `films/?populate=deep&filters[producer][name][$eq]=${producer}`;
    return getBothTypes(series, movies);
};

export const getAllTypeMoviesBySearch = async (value: string) => {
    const series = `series/?populate=deep&filters[title][$contains]=${value}`;
    const movies = `films/?populate=deep&filters[title][$contains]=${value}`;
    return getBothTypes(series, movies);
};
export const getAllTypeMoviesByDate = async () => {
    const today = new Date();
    let lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const filter = lastWeek.toJSON();
    const series = `series/?populate=deep&filters[publishedAt][$gte]=${filter}`;
    const movies = `films/?populate=deep&filters[publishedAt][$gte]=${filter}`;
    return getBothTypes(series, movies);
};

export function setToken(token: string) {
    const headerObj = { headers: { Authorization: `Bearer ${token}` } };
    return headerObj;
}

export const getAllUserData =
    async (): Promise<AllUserDataResponseType | null> => {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(
            apiURL + `users/me?populate=payment,profiles.avatar`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response && response.data) {
            return response.data as AllUserDataResponseType;
        } else {
            return null;
        }
    };

export const getUserProfiles = async (
    userId: number
): Promise<ProfileInfo[] | null> => {
    const response = await axios.get(
        apiURL +
            `profiles?populate=user,avatar&filters[user][id][$eq]=${userId}`
    );
    if (response && response.data.data) {
        return response.data.data;
    }
    return null;
};

export const getFavoriteMovies = async (
    profileId: number
): Promise<ProfileFavoritesResponsetype | null> => {
    const response = await axios.get(
        apiURL + `profiles/${profileId}?populate=attributes,favorite_films`
    );
    if (response && response.data.data) {
        return response.data.data;
    }
    return null;
};

export const getFavoriteSeries = async (
    profileId: number
): Promise<ProfileFavoritesResponsetype | null> => {
    const response = await axios.get(
        apiURL + `profiles/${profileId}?populate=attributes,favorite_series`
    );
    if (response && response.data.data) {
        return response.data.data;
    }
    return null;
};

export const getProfileImage = async (
    profileId: number
): Promise<ProfileInfo | null> => {
    const response = await axios.get(
        apiURL + `profiles/${profileId}?populate=deep`
    );
    if (response && response.data.data) {
        return response.data.data;
    }
    return null;
};

export const getProfileImageId = async (
    profileId: number
): Promise<ProfileResponseType | null> => {
    let id;
    await axios
        .get(apiURL + `profiles/${profileId}?populate=attributes,avatar`)
        .then((response) => {
            id = response.data.data.attributes.avatar.data
                ? response.data.data.attributes.avatar.data.id
                : null;
        });
    if (id) {
        return id;
    }
    return null;
};

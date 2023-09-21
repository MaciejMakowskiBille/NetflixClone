import axios from 'axios';
import { setAuthToken, uploadImage } from './Posts';
import { apiURL, authURL, uploadURL } from './links';
import { getProfileImage, getProfileImageId } from './Gets';

export const putUserData = async (data: putUserType) => {
    const token = localStorage.getItem('jwt');
    const response = await axios
        .put(apiURL + 'user/me', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });
    return response.data as PutUserResponseType;
};

export const changePassword = async (data: ChangePasswordType) => {
    const token = localStorage.getItem('jwt');
    const response = await axios
        .post(authURL + 'change-password', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            localStorage.setItem('jwt', response.data.jwt);
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
            },
        },
    });

    return response;
};

export const removeFavoriteMovie = async (
    profileId: number,
    movieId: number
) => {
    const response = await axios.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_films: {
                disconnect: [movieId],
            },
        },
    });

    return response;
};

export const addFavoriteSeries = async (
    profileId: number,
    seriesId: number
) => {
    const response = await axios.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_series: {
                connect: [seriesId],
            },
        },
    });

    return response;
};

export const removeFavoriteSeries = async (
    profileId: number,
    seriesId: number
) => {
    const response = await axios.put(`${apiURL}profiles/${profileId}`, {
        data: {
            favorite_series: {
                disconnect: [seriesId],
            },
        },
    });

    return response;
};

export const updateProfile = async (
    profileId: number,
    name: string,
    avatar: File | null,
    ageGroup: string
) => {
    const currentProfile = Number(localStorage.getItem('profileId'));
    if (avatar) {
        const profileImageId = getProfileImageId(profileId).then(
            (currentAvatarId) => {
                if (currentAvatarId) {
                    //remove old image if a profile currently has one
                    axios
                        .delete(uploadURL + `/files/${currentAvatarId}`)
                        .then(() => {
                            const formData = new FormData();
                            formData.append('files', avatar);

                            //upload new image
                            uploadImage(avatar).then((response) => {
                                const data: {
                                    username?: string;
                                    avatar: number | null;
                                    ageGroup?: string;
                                } = { avatar: response };
                                if (name) data.username = name;
                                if (ageGroup) data.ageGroup = ageGroup;

                                //assign new data to profile
                                axios
                                    .put(`${apiURL}profiles/${profileId}`, {
                                        data,
                                    })
                                    .then(() => {
                                        if (currentProfile === profileId) {
                                            getProfileImage(
                                                Number(profileId)
                                            ).then((response) => {
                                                localStorage.setItem(
                                                    'avatarUrl',
                                                    `${response?.attributes.avatar.data.attributes.url}`
                                                );
                                                window.location.reload();
                                            });
                                        } else {
                                            window.location.reload();
                                        }
                                    })
                                    .catch((error) => {
                                        throw new Error(
                                            'Wystąpił błąd podczas aktualizowania profilu:\n' +
                                                error
                                        );
                                    });
                            });
                        })
                        .catch((error) => {
                            throw new Error(
                                'Wystąpił błąd podczas usuwania zasobów:\n' +
                                    error
                            );
                        });
                } else {
                    const formData = new FormData();
                    formData.append('files', avatar);

                    // upload new imageif profile has none currently
                    uploadImage(avatar).then((response) => {
                        const data: {
                            username?: string;
                            avatar: number | null;
                            ageGroup?: string;
                        } = { avatar: response };
                        if (name) data.username = name;
                        if (ageGroup) data.ageGroup = ageGroup;

                        //assign new data to profile
                        axios
                            .put(`${apiURL}profiles/${profileId}`, { data })
                            .then(() => {
                                if (currentProfile === profileId) {
                                    getProfileImage(Number(profileId)).then(
                                        (response) => {
                                            localStorage.setItem(
                                                'avatarUrl',
                                                `${response?.attributes.avatar.data.attributes.url}`
                                            );
                                            window.location.reload();
                                        }
                                    );
                                } else {
                                    window.location.reload();
                                }
                            })
                            .catch((error) => {
                                throw new Error(
                                    'Wystąpił błąd podczas aktualizowania profilu:\n' +
                                        error
                                );
                            });
                    });
                }
            }
        );
    } else {
        const data: {
            username?: string;
            ageGroup?: string;
        } = {};
        if (name) data.username = name;
        if (ageGroup) data.ageGroup = ageGroup;

        //assign new data to profile
        axios
            .put(`${apiURL}profiles/${profileId}`, { data })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                throw new Error(
                    'Wystąpił błąd podczas aktualizowania profilu:\n' + error
                );
            });
    }
};

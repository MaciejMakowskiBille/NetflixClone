import axios, {isAxiosError} from "axios";
import { apiURL, authURL, uploadURL } from "./links";
import { setUserSession } from "./helpers";


export async function signIn(data: SignInType){
    try {
    const response = await axios
      .post(authURL+ 'local', {
        identifier: data.email,
        password: data.password,
      });

    setUserSession(response.data.jwt, response.data.user.id);

    return response.data as UserPostResponseType;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Wprowadzono nieprawidłowe dane");
      } 
    }
    throw new Error("Wystąpił nieoczekiwny błąd");
  }  
}



export const postUser = async (data: CreateUserType) => {
  try {
    const response = await axios.post(apiURL + "user/post", data);
    setUserSession(response.data.jwt, response.data.user.id);
    return response.data as UserPostResponseType;
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response?.status === 400) {
        throw new Error("Użytkownik o takim emailu już istnieje.\nSpróbuj ponownie!");
      }else{
        throw new Error("Nieoczekiwany błąd. \nSpróbuj ponownie!");
      }
    } else {
      throw new Error("Nieoczekiwany błąd. \nSpróbuj ponownie!");
    }
  }
};

export const addProfile = async (newProfileData: NewProfileCompleteInfo) => {
  
  const formData = new FormData();
  
  let data = {
    data: {
      ageGroup: newProfileData.ageGroup,
      user: newProfileData.userId,
      username: newProfileData.name,
      favorite_films: [],
      favorite_series: [],
      avatar: null
    }
  }

  if (newProfileData.avatar) {
    formData.append('files', newProfileData.avatar);
    const response = await axios.post(uploadURL, formData).then((response) => {
      data = {
        data: {
          ...data.data,
          avatar: response.data[0].id
        }
      }

      const profileResponse = axios.post(apiURL + "profiles", data)

      .then(response => (response))
      .catch(error => {throw new Error("Wystąpił nieoczekiwany błąd:\n"+error)});
      return profileResponse
    })
    .catch(error => {throw new Error("Wystąpił nieoczekiwany błąd:\n"+error)});
    
    return response;
  } else {
    const response = await axios.post(apiURL + "profiles", data)
    .then(response => response.data.data)
    .catch(error => {throw new Error("Wystąpił nieoczekiwany błąd:\n"+error)});

    return response;
  }
}

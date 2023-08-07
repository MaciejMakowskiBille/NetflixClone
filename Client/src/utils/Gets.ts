import axios from "axios";
import { apiURL } from "./links";
import { clearCategoryData, clearMovieData } from "./helpers";
export const getFilms = async ():Promise<MovieDataType[] | null> => {
  const response = await axios.get(apiURL + `films?populate=deep&?`)
  if(response && response.data.data){
      const data:MovieResponseType[] = response.data.data
      const clearedData:MovieDataType[] = data.map(item => {
        return clearMovieData(item)
      })
      return clearedData
  }else{
    return null
  }
}

export const getOneFilm = async (id:number):Promise<MovieDataType | null> => {
  const response = await axios.get(apiURL + `films/${id}?populate=deep`)
  if(response && response.data.data){
      const data:MovieResponseType = response.data.data
      return clearMovieData(data)
  }else{
    return null
  }
}

export const getCategories = async () => {
    const response = await axios.get(apiURL + `categories`)
    if(response && response.data.data){
      const data:Category[] = clearCategoryData(response.data.data)
      return data
    }else{
      return null
    }
}
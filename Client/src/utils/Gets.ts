import axios from "axios";
import { apiURL } from "./links";
import { clearCategoryData, clearMovieData, clearSeriesData,clearSliderData  } from "./helpers";
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
      return clearMovieData(response.data.data)
  }else{
    return null
  }
}

export const getSeries = async () => {
  const response = await axios.get(apiURL + `series?populate=deep&?`)
  if(response && response.data.data){
    const data:SeriesResponseType[] = response.data.data
    const clearedData:SeriesDataType[] = data.map(item => {
      return clearSeriesData(item)
    })
    return clearedData
  }else{
    return null
  }
}
export const getOneSeries = async (id:number):Promise<SeriesDataType | null> => {
  const response = await axios.get(apiURL + `series/${id}?populate=deep`)
  if(response && response.data.data){
      return clearSeriesData(response.data.data)
  }else{
    return null
  }
}

export const getCategories = async ():Promise<Category[] | null> => {
    const response = await axios.get(apiURL + `categories`)
    if(response && response.data.data){
      return clearCategoryData(response.data.data)
      }else{
      return null
    }
}

export const getSlider = async () => {
    const response = await axios.get(apiURL + 'sliders?populate=deep')
    if(response && response.data.data){
      const data:SliderResponseType[] = response.data.data
      const clearedData:Slide[] = data.map(item => {
        return clearSliderData(item)
      })
      return clearedData
    }else{
      return null
    }
}
import axios from "axios";
import { apiURL } from "./links";
import { clearData, clearSliderData } from "./helpers";
export const getFilms = async ():Promise<MovieDataType[] | null> => {
  const response = await axios.get(apiURL + `films?populate=deep`)
  if(response && response.data.data){
      const data:MovieResponseType[] = response.data.data
      const clearedData:MovieDataType[] = data.map(item => {
        return clearData(item)
      })
      return clearedData
  }else{
    return null
  }
}

export const getOneFilm = async (id:number):Promise<MovieDataType | null> => {
  const response = await axios.get(apiURL + `films/${id}?populate=deep`)
  console.log(response)
  if(response && response.data.data){
      const data:MovieResponseType = response.data.data
      return clearData(data)
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
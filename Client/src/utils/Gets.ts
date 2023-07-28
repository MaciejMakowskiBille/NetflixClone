import axios from "axios";
const apiURL = "http://localhost:1337/api/"

export const getFilms = async () => {
    axios.get(apiURL + "films?populate=deep").then((response) => {
        console.log(response.data);
      });
}

export const getOneFilm = async (id:number):Promise<MovieDataType | null> => {
  const response = await axios.get(apiURL + `films?populate=deep&?id=${id}`)
  if(response && response.data.data[0]){
      const data:MovieResponseType = response.data.data[0]
      const clearedCast:Actor[] = data.attributes.cast.data.map((actor) => {
        return (
          {
            id:actor.id,
            firstName:actor.attributes.firstName,
            lastName:actor.attributes.lastName,
            birthDate:actor.attributes.birthDate,
            image:actor.attributes.image.data.attributes.url
          }
        )
      })
      const clearedCategory:Category[] = data.attributes.categories.data.map((category) => {
        return (
          {
            id:category.id,
            name:category.attributes.name,
          }
        )
      })

      const clearedDirector:Director = {
        id: data.attributes.director.data.id,
        firstName: data.attributes.director.data.attributes.firstName,
        lastName: data.attributes.director.data.attributes.lastName,
        birthDate: data.attributes.director.data.attributes.birthDate,
        image: data.attributes.director.data.attributes.image.data.attributes.url
      }
      const clearedData:MovieDataType = {
        id:data.id,
        title:data.attributes.title,
        description:data.attributes.description,
        longDescription:data.attributes.longDescription,
        premiere:data.attributes.premiere,
        video:data.attributes.video.data.attributes.url,
        primaryImg:data.attributes.primaryImg.data.attributes.url,
        miniImg:data.attributes.miniImg.data.attributes.url,
        hoverImg:data.attributes.hoverImg.data.attributes.url,
        logo:data.attributes.logo.data.attributes.url,
        duration:data.attributes.duration,
        categories:clearedCategory,
        cast:clearedCast,
        director:clearedDirector,
      }
      return clearedData
  }else{
    return null
  }
}
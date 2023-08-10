
export const clearData = (data:MovieResponseType) => {
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
        ageCategory:data.attributes.ageCategory,
        transcription:data.attributes.transcription
      }
      return clearedData
}



export const clearSliderData = (data:SliderResponseType) => {
      const clearedData =
          {
            id:data.id,
            title:data.attributes.title,
            movieId:data.attributes.movieId,
            movieType:data.attributes.movieType,
            image:data.attributes.image.data.attributes.url,
            logo:data.attributes.logo.data.attributes.url,
          }
      return clearedData
}
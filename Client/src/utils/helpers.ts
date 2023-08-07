
export const clearMovieData = (data:MovieResponseType) => {

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
        categories:clearCategoryData(data.attributes.categories.data),
        cast:clearCastData(data.attributes.cast.data),
        director:clearDirectorData(data.attributes.director.data),
        ageCategory:data.attributes.ageCategory,
        transcription:data.attributes.transcription
      }
      return clearedData
}

export const clearSeriesData = (data:SeriesResponseType) => {
    const clearedData:SeriesDataType = {
      id:data.id,
      title:data.attributes.title,
      description:data.attributes.description,
      longDescription:data.attributes.longDescription,
      premiere:data.attributes.premiere,
      primaryImg:data.attributes.primaryImg.data.attributes.url,
      miniImg:data.attributes.miniImg.data.attributes.url,
      hoverImg:data.attributes.hoverImg.data.attributes.url,
      logo:data.attributes.logo.data.attributes.url,
      categories:clearCategoryData(data.attributes.categories.data),
      cast:clearCastData(data.attributes.cast.data),
      ageCategory:data.attributes.ageCategory,
      transcription:data.attributes.transcription,
      seasons:clearSeasonsData(data.attributes.seasons.data)
    }
    return clearedData
}

export const clearSeasonsData = (data:SeasonResponseType[]) => {
  const clearedSeasons:Season[] = data.map(season => {
    return(
      {
        id:season.id,
        title:season.attributes.title,
        number:season.attributes.number,
        episodes:clearEpisodesData(season.attributes.episodes.data)
      }
    )
  })
  return clearedSeasons
}

export const clearEpisodesData = (data:EpisodeResponseType[]) => {
  const clearedEpisodes:Episode[] = data.map(episode => {
    return(
      {
        id:episode.id,
        title:episode.attributes.title,
        description:episode.attributes.description,
        number:episode.attributes.number,
        premiere:episode.attributes.premiere,
        director:clearDirectorData(episode.attributes.director.data),
        duration:episode.attributes.duration,
        miniImg:episode.attributes.miniImg.data.attributes.url,
        hoverImg:episode.attributes.hoverImg.data.attributes.url,
        video:episode.attributes.video.data.attributes.url,

      }
    )
  })
  return clearedEpisodes
}

export const clearCategoryData = (data:CategoryResponseType[]) => {
  const clearedCategories:Category[] = data.map((category) => {
    return (
      {
        id:category.id,
        name:category.attributes.name,
      }
    )
  })
  
  return clearedCategories
}

export const clearDirectorData = (data:DirectorResponseType) => {
  const clearedDirector:Director = {
    id: data.id,
    firstName: data.attributes.firstName,
    lastName: data.attributes.lastName,
    birthDate: data.attributes.birthDate,
    image: data.attributes.image.data.attributes.url
  }
  return clearedDirector
}

export const clearCastData = (data:ActorResponseType[]) => {
  const clearedCast:Actor[] = data.map((actor) => {
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

  return clearedCast
}
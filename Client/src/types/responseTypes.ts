type MovieResponseType = {
        attributes:{
            title:string
            description:string
            longDescription:string
            premiere:string
            video:{data:MediaResponseType}
            primaryImg:{data:MediaResponseType}
            miniImg:{data:MediaResponseType}
            hoverImg:{data:MediaResponseType}
            logo:{data:MediaResponseType}
            duration:number
            categories:{data:CategoryResponseType[]}
            cast:{data: ActorResponseType[]}
            director:{data: DirectorResponseType}
            ageCategory:number
            transcription:boolean

            createdAt:string
            updatedAt:string
            publishedAt:string
        }
        id:number
}

type SeriesResponseType = {
    attributes:{
        title:string
        description:string
        longDescription:string
        premiere:string
        primaryImg:{data:MediaResponseType}
        miniImg:{data:MediaResponseType}
        hoverImg:{data:MediaResponseType}
        logo:{data:MediaResponseType}
        categories:{data:CategoryResponseType[]}
        cast:{data: ActorResponseType[]}
        director:{data: DirectorResponseType}
        ageCategory:number
        transcription:boolean
        seasons:{data:SeasonResponseType[]}

        createdAt:string
        updatedAt:string
        publishedAt:string
    }
    id:number
}

type CategoryResponseType = {
    attributes:{
        name:string
        createdAt:string
        updatedAt:string
        publishedAt:string
    }
    id:number
}

type ActorResponseType = {
    attributes:{
        firstName:string
        lastName:string
        birthDate:string
        image:{data:MediaResponseType}

        createdAt:string
        updatedAt:string
        publishedAt:string
    }
    id:number
}

type MediaResponseType = {
    attributes:{
        alternativeText?:string
        caption?:string
        ext:string
        hash:string
        height:number
        width:number
        mime:string
        name:string
        provider:string
        size:number
        url:string

        createdAt:string
        updatedAt:string
        publishedAt:string
    }
    id:number
}

type DirectorResponseType = {
    attributes:{
        firstName:string
        lastName:string
        birthDate:string
        image:{data: MediaResponseType}

        createdAt:string
        updatedAt:string
        publishedAt:string
    }
    id:number
}

type SeasonResponseType = {
    attributes:{
        title:string
        number:string
        episodes:{data:EpisodeResponseType[]}

        createdAt:string
        updatedAt:string
        publishedAt:string
    }
    id:number
}

type EpisodeResponseType = {
    attributes:{
        title:string
        number:number
        premiere:string
        description:string
        director:{data:DirectorResponseType}
        duration:number
        miniImg:{data:MediaResponseType}
        hoverImg:{data:MediaResponseType}
        video:{data:MediaResponseType}
        createdAt:string
        updatedAt:string
        publishedAt:string
    }
    id:number
}
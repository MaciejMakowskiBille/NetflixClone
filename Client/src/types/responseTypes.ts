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
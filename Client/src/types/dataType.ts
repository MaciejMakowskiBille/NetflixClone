

type MovieDataType = {
    id:number
    title:string
    description:string
    longDescription:string
    premiere:string
    video:string | null
    primaryImg:string
    miniImg:string
    hoverImg:string
    logo:string
    duration:number
    categories:Category[]
    cast:Actor[]
    director:Director
    ageCategory:number
    transcription:boolean
}
type Category = {
    id:number
    name:string
}
type Actor = {
    id:number
    firstName:string
    lastName:string
    birthDate:string
    image:string
}

type Director = {
    id:number
    firstName:string
    lastName:string
    birthDate:string
    image:string
}

type Slide = {
    id:number
    title:string
    movieId:number
    movieType:string
    image:string
    logo:string
}
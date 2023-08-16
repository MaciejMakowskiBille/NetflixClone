import {useState, useEffect} from 'react'
import { serverURL } from "../../../utils/links"
import ActorComponent from "./Actor/actorComponent"
import { getAllTypeMoviesByCategory, getFilms } from '../../../utils/Gets'
import SeasonsComponent from './Seasons/seasonsComponent'
import CategoryRow from '../../../components/CategoryRow/categoryRow'

type MoviePageAddsProps = {
    id:number
    active:string
    title:string
    cast:Actor[]
    longDesc:string
    premiere:string
    director?:Director
    ageCategory:number
    duration?:number
    seasons?:Season[]
    categories:Category[]
}


const MoviePageAdds = (props:MoviePageAddsProps) => {

    const [moviesData, setMoviesData] = useState<CombinedDataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getAllTypeMoviesByCategory(props.categories[0].name, props.id).then((res) => {
            setMoviesData(res)
            setIsLoading(false)
        })
    },[props.id])

    const showLength = () =>{
        if(props.duration && "duration" in props){
            return(
                <div>
                    <div className="infoTitle">
                        Czas trwania:
                    </div>
                    <div className="infoValue">
                        {Math.floor(props.duration/60)} godz.
                        {props.duration%60}min
                </div>
            </div>
            )
        }
        if(props.seasons && "seasons" in props){
            return(
                <div>
                    <div className="infoTitle">
                        Liczba sezonów:
                    </div>
                    <div className="infoValue">
                        {props.seasons.length}
                </div>
            </div>
            )
        }
    }

    return(
        <div className="movieAdds">
            {props.active === 'sea' && props.seasons && (
                <SeasonsComponent seasons={props.seasons}/>
            )}
            {props.active === 'rec' && !isLoading && moviesData && (
                        <CategoryRow title='all' moviesList={moviesData}></CategoryRow>
                    )
            }
            {props.active === 'det' && (
                <div className="moreInfo">
                    <div className="left">
                        <div className="title">
                            {props.title}
                        </div>
                        <div className="longDesc">
                            {props.longDesc}
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            {showLength()}
                            <div>
                                <div className="infoTitle">
                                    Premiera:
                                </div>
                                <div className="infoValue">
                                    {props.premiere}
                                </div>
                            </div>
                            <div>
                                <div className="infoTitle">
                                    Kategoria wiekowa:
                                </div>
                                <div className="infoValue">
                                    {props.ageCategory} lat
                                </div>
                            </div>
                        </div>
                        <div className="mid">
                        <div className="infoTitle">
                                    Gatunek:
                                </div>
                                <div className="infoValue">
                                    {props.categories.map((cat,index) => {
                                        return(
                                            <div key={cat.id}>
                                                {cat.name}
                                                {index < props.categories.length -1 ? ',' : ''}
                                            </div>
                                        )
                                    })}
                                </div>
                        </div>
                        { props.director && "director" in props && (
                            <div className="bottom">
                                <div className="infoTitle">
                                    Reżyser:
                                </div>
                                <div 
                                className="directorPhoto" 
                                style={{backgroundImage: `url(${serverURL + props.director.image})`}}
                                />
                                <div>
                                    {props.director.firstName + " " + props.director.lastName}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {props.active === 'cast' && (
                <div className='castScroll'>
                    <div className="castRow">
                            {props.cast.map((actor, index) => {
                                return(
                                    <ActorComponent 
                                        key={index}
                                        firstName={actor.firstName}
                                        lastName={actor.lastName}
                                        image={actor.image}
                                    />
                                )
                            })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MoviePageAdds
import { serverURL } from "../utils/links"
import ActorComponent from "./actorComponent"
import MovieTile from "./movieTile"

type MoviePageAddsProps = {
    active:string
    title:string
    cast:Actor[]
    longDesc:string
    premiere:string
    director:Director
    ageCategory:number
    duration:number
    categories:Category[]
}


const MoviePageAdds = (props:MoviePageAddsProps) => {

    return(
        <div className="movieAdds">
            {props.active === 'rec' && (
                <div>
                </div>
            )}
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
                            <div>
                                <div className="infoTitle">
                                    Czas trwania:
                                </div>
                                <div className="infoValue">
                                    {Number(props.duration/60).toFixed()} godz.
                                    {props.duration%60}min
                                </div>
                            </div>
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
                    </div>
                </div>
            )}
            {props.active === 'cast' && (
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
            )}
        </div>
    )
}

export default MoviePageAdds
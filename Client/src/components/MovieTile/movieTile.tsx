import { useState } from "react"
import { serverURL } from "../../utils/links"
import { useNavigate } from "react-router-dom"
type MovieTileProps = {
    id:number
    title:string,
    categories:Category[]
    img:string,
    hoverImg:string,
    logo:string,
    ageCategory:number,
    premiere:string,
    transcription?:boolean,
    duration?:number,
    seasons?:number
    isFavorite?: boolean
}

const MovieTile = (props:MovieTileProps) => {
    const [tileImage, setTileImage] = useState(props.img)
    const [isMouseOverTile, setIsMouseOverTile] = useState(false)
    const navigate = useNavigate()
    const path = "duration" in props ? `/movie/m/${props.id}` : "seasons" in props ? `/movie/s/${props.id}` : '/'

    const handleMouseOver = () => {
        setTileImage(props.hoverImg)
        setIsMouseOverTile(true)
    }
    const handleMouseLeave = () => {
        setTileImage(props.img)
        setIsMouseOverTile(false)
    }

    return(
        <div className="tile">
        <div className="movieTile"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >

            <div 
                className="movieTileImage" 
                style={{backgroundImage:`url(${serverURL+tileImage})`}} 
                onClick={() => navigate(path)}
            >
            </div>
            {isMouseOverTile && (
                <div 
                className="movieTileInfo" 
                >
                    <div className="tileHeader">
                    <div className="infos">
                            {props.ageCategory}+
                            <div className="separator"/>
                            {props.transcription && (
                                <>CC <div className="separator"/></>
                            )}
                            {props.premiere.substring(0,4)}
                            {props.duration && (
                                <>
                                    <div className="separator"/>
                                    {Math.floor(props.duration/60)} godz. 
                                    {props.duration%60}min
                                </>
                            )}
                            {props.seasons && (
                                <>
                                    <div className="separator"/>
                                    Sezony: {props.seasons}
                                </>
                            )}
                    </div>
                    </div>
                    <div className="infos middle">
                        <div className="movieLogo" style={{backgroundImage:`url(${serverURL + props.logo})`}}/>
                        <div className="buttons">
                        <div className={`icon iconButton ${props.isFavorite ? "activeFavButton" : "favButton"}`}/>
                        <div className="icon iconButton moreButton" onClick={() => navigate(path)}/>
                    </div>
                            
                    </div>
                    <div className="categories">
                        {props.categories.map((category, index) => {
                            return(
                                <div key={index} className="movieCategory">
                                    {category.name}
                                    {index < props.categories.length-1 && (
                                        <div className="separator"/>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}

export default MovieTile
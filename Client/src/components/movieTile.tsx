import { useState } from "react"
import PlayButtonIco from '../imgs/movieTile/Play.png'
import FavButtonIco from '../imgs/movieTile/Favorite.png'
import MoreButtonIco from '../imgs/movieTile/More.png'

type MovieTileProps = {
    title:string,
    categories:string[]
    img:string,
    hoverImg:string,
    logo:string,
    ageCategory:number,
    premiere:Date,
    transcription?:boolean,
    duration?:string,
    sezons?:number


}

const MovieTile = (props:MovieTileProps) => {
    const [tileImage, setTileImage] = useState(props.img)
    const [isMouseOverTile, setIsMouseOverTile] = useState(false)

    const handleMouseOver = () => {
        setTileImage(prev => prev = props.hoverImg)
        setIsMouseOverTile(prev => prev = true)
    }
    const handleMouseLeave = () => {
        setTileImage(prev => prev = props.img)
        setIsMouseOverTile(prev => prev = false)
    }


    return(
        <div className="movieTile"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >

            <div 
                className="movieTileImage" 
                style={{backgroundImage:`url(${tileImage})`}} 
            />
            {isMouseOverTile && (
                <div className="movieTileInfo">
                    <div className="tileHeader">
                        <div className="infos">
                        <div className="icon tileButton playButton"/>
                        <div className="icon tileButton favButton"/>
                        </div>
                        <div className="infos">
                            {props.ageCategory}+
                            <div className="separator"/>
                            {props.transcription && (
                                <>CC <div className="separator"/></>
                            )}
                            {props.premiere.getFullYear()}
                            {props.duration && (
                                <>
                                    <div className="separator"/>
                                    {props.duration} 
                                </>
                            )}
                            {props.sezons && (
                                <>
                                    <div className="separator"/>
                                    Sezony: {props.sezons}
                                </>
                            )}
                        </div>
                        <div className="icon tileButton moreButton"/>
                    </div>

                    <div className="movieLogo" style={{backgroundImage:`url(${props.logo})`}}/>
                    <div className="categories">
                        {props.categories.map((category, index) => {
                            return(
                                <div key={index} className="movieCategory">
                                    {category}
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
    )
}

export default MovieTile
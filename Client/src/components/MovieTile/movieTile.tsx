import { useState } from "react"
import {motion} from 'framer-motion'
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
    sezons?:number
}

const MovieTile = (props:MovieTileProps) => {
    const [tileImage, setTileImage] = useState(props.img)
    const [isMouseOverTile, setIsMouseOverTile] = useState(false)
    const navigate = useNavigate()

    const handleMouseOver = () => {
        setTileImage(prev => prev = props.hoverImg)
        setIsMouseOverTile(prev => prev = true)
    }
    const handleMouseLeave = () => {
        setTileImage(prev => prev = props.img)
        setIsMouseOverTile(prev => prev = false)
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
            >
                {isMouseOverTile && (
                    <div className="icon iconButton playButton"/>
                )}
            </div>
            {isMouseOverTile && (
                <motion.div 
                className="movieTileInfo" 
                initial={{y:'-100%', opacity:0}}
                whileInView={{y:0, opacity:1}}
                transition={{duration:0.5}}
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
                                    {Number(props.duration/60).toFixed()} godz.
                                    {props.duration%60}min
                                </>
                            )}
                            {props.sezons && (
                                <>
                                    <div className="separator"/>
                                    Sezony: {props.sezons}
                                </>
                            )}
                    </div>
                    </div>
                    <div className="infos middle">
                            <div className="movieLogo" style={{backgroundImage:`url(${serverURL + props.logo})`}}/>
                            <div className="icon iconButton favButton"/>
                            <div className="icon iconButton moreButton" onClick={() => navigate(`/movie/${props.id}`)}/>
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
                </motion.div>
            )}
        </div>
        </div>
    )
}

export default MovieTile
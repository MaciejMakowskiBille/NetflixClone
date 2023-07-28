import { useState } from "react"
import {motion} from 'framer-motion'

type MovieTileProps = {
    title:string,
    categories:Category[]
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
        <div className="tile">
        <div className="movieTile"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >

            <div 
                className="movieTileImage" 
                style={{backgroundImage:`url(${tileImage})`}} 
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
                        <div className="infos">
                            <div className="icon iconButton favButton"/>
                            <div className="icon iconButton moreButton"/>
                        </div>
                    </div>

                    <div className="movieLogo" style={{backgroundImage:`url(${props.logo})`}}/>
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
import { useState, ChangeEvent,useEffect } from "react"
import EpisodeComponent from "../Episode/episodeComponent"


type SeasonsComponentProps = {
    seasons:Season[]
}

const SeasonsComponent = (props:SeasonsComponentProps) => {
    const [activeSeason, setActiveSeason] = useState(props.seasons[0])

    const handleChangeSeason = (event: ChangeEvent<HTMLSelectElement>) => {
        setActiveSeason(props.seasons[Number(event.target.value)])
    }
    useEffect(() => {
        setActiveSeason((prev) => ({
            ...prev, 
            episodes:prev.episodes.sort((a,b) => a.number - b.number)
        }))
    },[activeSeason])

    return(
        <div className="seasons">
                <select title="Sezony" onChange={handleChangeSeason}>
                    {props.seasons.map((season, index) => {
                        return(
                            <option 
                                value={index}
                                key={season.id}
                            >
                                Sezon {season.number}
                            </option>
                        )
                    })}
                </select>
            <div className="episodes">
                <div className="episodesRow">
                {activeSeason.episodes.map(episode => {
                    return(
                        <EpisodeComponent
                        key={episode.id}
                        id={episode.id}
                        title={episode.title}
                        number={episode.number}
                        premiere={episode.premiere}
                        description={episode.description}
                        director={episode.director}
                        duration={episode.duration}
                        miniImg={episode.miniImg}
                        hoverImg={episode.hoverImg}
                        video={episode.video}
                        />
                    )
                })}
                </div>
            </div>

        </div>
    )
}

export default SeasonsComponent
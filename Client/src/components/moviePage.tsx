import {useState, useEffect} from 'react'
import { getOneFilm } from '../utils/Gets'

const MoviePage = () => {
    const [movieData, setMovieData] = useState<MovieDataType | null>(null)
    useEffect(() => {
        getOneFilm(1).then((res) => {
            console.log(res)
        })
    },[])
    return(
        <div>
            
        </div>
    )
}

export default MoviePage
import {useState, useEffect} from 'react'
import { getOneFilm } from '../utils/Gets'
import Navigation from './nav'
import { serverURL } from '../utils/links'
import MoviePageNav from './moviePageNav'
import MoviePageAdds from './moviePageAdds'
const MoviePage = () => {
    const [movieData, setMovieData] = useState<MovieDataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [active, setActive] = useState('rec')
    useEffect(() => {
        getOneFilm(1).then((res) => {
            setMovieData(prev => prev = res)
            console.log(movieData)
            setIsLoading(prev => prev = false)
        })
    },[])
    return(
        <>
        <div className="appBackground">
            <Navigation/>
                {!isLoading && movieData && (
                    <main>
                    <div className='movieInfoMain'>
                    <div className='primaryImage' style={{backgroundImage:`url(${serverURL + movieData.primaryImg})`}}/>
                    <div className='content'>
                        <div className='logo' style={{backgroundImage:`url(${serverURL + movieData.logo})`}}/>
                        <div className='short'>
                            <div className='top'>
                                <div className='smallInfo'>{movieData.ageCategory}+</div>
                                {movieData.transcription && (
                                    <div className='smallInfo'>CC</div>
                                )}
                                {movieData.premiere.substring(0,4)}
                                    <div className='separator'/>
                                {Number(movieData.duration/60).toFixed()} godz. 
                                {movieData.duration%60}min
                            </div>
                            <div className='bottom'>
                                {movieData.categories.map((category,index) => {
                                    return(
                                            <div className='category' key={category.id}>
                                                {category.name}
                                                {index < movieData.categories.length -1 ? ',' : ''}
                                            </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='buttons'>
                            <button className='button-primary'>ODTWÓRZ</button>
                            <button className='button-secondary'>ZWIASTUN</button>
                            <button className='iconButton icon favButton'/>
                        
                        </div>
                        <div className='description'>
                            {movieData.description}
                        </div>
                    </div>
                </div>
                    <MoviePageNav 
                        active={active} 
                        setActive={setActive}
                    />
                    <MoviePageAdds
                        active={active}
                        title={movieData.title}
                        cast={movieData.cast}
                        longDesc={movieData.longDescription}
                        premiere={movieData.premiere}
                        director={movieData.director}
                        ageCategory={movieData.ageCategory}
                        duration={movieData.duration}
                        categories={movieData.categories}
                     />
                </main>
                )}
        </div>
        </>
    )
}

export default MoviePage
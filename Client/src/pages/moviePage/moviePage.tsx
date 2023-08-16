import {useState, useEffect} from 'react'
import { getOneFilm, getOneSeries } from '../../utils/Gets'
import Navigation from '../../components/Navigation/nav'
import { serverURL } from '../../utils/links'
import MoviePageNav from './components/moviePageNav'
import MoviePageAdds from './components/moviePageAdds'
import { useNavigate, useParams, Link } from 'react-router-dom'
const MoviePage = () => {
    const [movieData, setMovieData] = useState<MovieDataType | SeriesDataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [active, setActive] = useState('rec')
    const {movieType,movieId} = useParams()
    const navigate = useNavigate()


    const showLength = () => {
        if(movieData && "duration" in movieData){
            return(
                <>
                    {Math.floor(movieData.duration/60)} godz. 
                    {movieData.duration%60}min
                </>
            )
        }
        if(movieData && "seasons" in movieData){
            return(
                <>
                    Sezony: {movieData.seasons.length}
                </>
            )
        }
    }

    const handlePlayVideo = () => {
        if( movieData &&"video" in movieData  && movieData.video){
            const videoURL = serverURL + movieData.video;
            window.open(videoURL, '_blank'); 

        }
    }
        

    useEffect(() => {
        if(movieType === 'm'){
            if(movieId){
                getOneFilm(+movieId).then((res) => {
                    setMovieData(res)
                    setActive('rec')
                    setIsLoading(false)
                })
            }
        }
        if(movieType === 's'){
            if(movieId){
                getOneSeries(+movieId).then((res) => {
                    setMovieData(res)
                    setActive('sea')
                    setIsLoading(false)
                })
            }
        }
    },[movieId,movieType])
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
                            <div className='title'>
                                {movieData.title}
                            </div>
                            <div className='top'>
                                <div className='smallInfo'>{movieData.ageCategory}+</div>
                                {movieData.transcription && (
                                    <div className='smallInfo'>CC</div>
                                )}
                                {movieData.premiere.substring(0,4)}
                                    <div className='separator'/>
                                    {showLength()}
                                
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
                        {movieType === 'm' && (
                            <div className='buttons'>
                                <button className='button-primary' onClick={handlePlayVideo}>ODTWÓRZ</button>
                                <button className='button-secondary ' onClick={handlePlayVideo}>ZWIASTUN</button>
                                <button className='iconButton icon favButton'/>
                            </div>
                        )}
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
                        id={movieData.id}
                        active={active}
                        title={movieData.title}
                        cast={movieData.cast}
                        longDesc={movieData.longDescription}
                        premiere={movieData.premiere}
                        ageCategory={movieData.ageCategory}
                        categories={movieData.categories}
                        {...("director" in movieData && {director:movieData.director})}
                        {...("duration" in movieData && {duration:movieData.duration})}
                        {...("seasons" in movieData && {seasons:movieData.seasons})}
                     />
                </main>
                )}
                <section className='spacer'>

                </section>
        </div>
        </>
    )
}

export default MoviePage
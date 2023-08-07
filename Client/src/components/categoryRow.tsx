import { useEffect, useState } from "react"
import MovieTile from "./MovieTile/movieTile"
type CategoryRowPorps = {
    title:string,
    moviesList:MovieDataType[]
}


const CategoryRow = (props:CategoryRowPorps) => {
    const [hasMovies, setHasMovies] = useState(false)

    const checkIfHasMovies = () => {
        props.moviesList.map(movie => {
            if(movie.categories.some(category => category.name === props.title)){
                setHasMovies(prev => prev = true)
            }
        })
    }

    useEffect(() => {
        checkIfHasMovies()
    },[])

    return (
        hasMovies ? (
            <div className="category">
                <div className="title">
                    {props.title}
                </div>
                <div className="movieList">
                    {props.moviesList.map((movie, index) => {
                        const isActionMovie = movie.categories.some(category => category.name === props.title);
                        if (isActionMovie) {
                            return (
                                <MovieTile
                                    key={index}
                                    id={movie.id}
                                    title={movie.title}
                                    categories={movie.categories}
                                    img={movie.miniImg}
                                    hoverImg={movie.hoverImg}
                                    logo={movie.logo}
                                    ageCategory={movie.ageCategory}
                                    premiere={movie.premiere}
                                    transcription={movie.transcription}
                                    duration={movie.duration}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        ) : null
    );
}
export default CategoryRow
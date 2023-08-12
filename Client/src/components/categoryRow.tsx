import { useEffect, useState } from "react"
import MovieTile from "./MovieTile/movieTile"
type CategoryRowPorps = {
    title:string,
    moviesList:CombinedDataType
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

    const checkVideoType = (data: MovieDataType | SeriesDataType) => {
            return(
                <MovieTile
                    key={data.id + ("seasons" in data ? "s" : "m")}
                    id={data.id}
                    title={data.title}
                    categories={data.categories}
                    img={data.miniImg}
                    hoverImg={data.hoverImg}
                    logo={data.logo}
                    ageCategory={data.ageCategory}
                    premiere={data.premiere}
                    transcription={data.transcription}
                    {...("duration" in data && { duration: data.duration })}
                    {...("seasons" in data && { seasons: data.seasons.length })}
                />
            )
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
                    {props.moviesList.map((movie) => {
                        const isCategoryMovie = movie.categories.some(category => category.name === props.title);
                        if (isCategoryMovie) {
                            return checkVideoType(movie)
                        }
                        return null;
                    })}
                </div>
            </div>
        ) : null
    );
}
export default CategoryRow
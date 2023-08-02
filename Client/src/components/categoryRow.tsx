import MovieTile from "./MovieTile/movieTile"
import { FilmListType } from "../types/mainPage"
type CategoryRowPorps = {
    title:string,
    moviesList:FilmListType
}


const CategoryRow = (props:CategoryRowPorps) => {

    return(
        <div className="category">
            <div className="title">
                {props.title}
            </div>
            <div className="movieList">
                {props.moviesList.map((movie, index) => {
                    return(
                        <MovieTile
                            key={index}
                            title={movie.title}
                            categories={movie.categories}
                            img={movie.img}
                            hoverImg={movie.hoverImg}
                            logo={movie.logo}
                            ageCategory={movie.ageCategory}
                            premiere={movie.premiere}
                            transcription={movie.transcription}
                            sezons={11}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default CategoryRow
import MovieTile from "./movieTile"
type CategoryRowPorps = {
    title:string,
    moviesList:MovieDataType[]
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
                            id={movie.id}
                            title={movie.title}
                            categories={movie.categories}
                            img={movie.primaryImg}
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
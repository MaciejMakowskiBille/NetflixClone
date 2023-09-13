import { useEffect, useState } from "react";
import MovieTile from "../MovieTile/movieTile";
import { useFavoriteMoviesIds } from "../../customHooks/useFavoriteMoviesIds";
import { useFavoriteSeriesIds } from "../../customHooks/useFavoriteSeriesIds";
type CategoryRowPorps = {
  title: string;
  moviesList: CombinedDataType;
};

const CategoryRow = (props: CategoryRowPorps) => {
  const [filteredMovies, setFilteredMovies] = useState<CombinedDataType>([]);
  let displayed = 0;
  const [display, setDisplay] = useState(4);
  const favoriteMoviesIds = useFavoriteMoviesIds({ reloadValueCheck: null });
  const favoriteSeriesIds = useFavoriteSeriesIds({ reloadValueCheck: null });

  const checkVideoType = (data: MovieDataType | SeriesDataType) => {
    return (
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
        isFavorite={
          "seasons" in data
            ? favoriteSeriesIds?.includes(data.id)
            : favoriteMoviesIds?.includes(data.id)
        }
        {...("duration" in data && { duration: data.duration })}
        {...("seasons" in data && { seasons: data.seasons.length })}
      />
    );
  };

  useEffect(() => {
    setFilteredMovies([]);
    if (
      props.title !== "all" &&
      props.title !== "Filmy" &&
      props.title !== "Seriale"
    ) {
      props.moviesList.map((movie) => {
        if (
          movie.categories.some((category) => category.name === props.title)
        ) {
          setFilteredMovies((prev) => [...prev, movie]);
        }
      });
    } else {
      setFilteredMovies(props.moviesList);
    }
  }, [props.moviesList]);

  return filteredMovies.length > 0 ? (
    <div className="category">
      {props.title !== "all" && <div className="title">{props.title}</div>}
      <div className="movieList">
        {filteredMovies.length > 5 && display - 4 > 0 && (
          <div className="arrowBg leftBg">
            <div
              className="arrow"
              onClick={() => setDisplay((prev) => prev - 1)}
            ></div>
          </div>
        )}

        {filteredMovies.map((movie, index) => {
          if (displayed < 5 && display - index >= 0 && display - index <= 4) {
            displayed++;
            return checkVideoType(movie);
          }
        })}

        {filteredMovies.length > 5 && display + 1 < filteredMovies.length && (
          <div className="arrowBg rightBg">
            <div
              className="arrow right"
              onClick={() => setDisplay((prev) => prev + 1)}
            ></div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="category">
      {props.title !== "all" && <div className="title">{props.title}</div>}
      <p>-</p>
    </div>
  );
};
export default CategoryRow;

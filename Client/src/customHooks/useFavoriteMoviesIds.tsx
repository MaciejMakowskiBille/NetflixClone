import { useEffect, useState } from "react";
import { getFavoriteMovies } from "../utils/Gets";

export const useFavoriteMoviesIds = ({
  reloadValueCheck,
}: {
  reloadValueCheck: any;
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<number[] | null>();

  useEffect(() => {
    const profileId = Number(localStorage.getItem("profileId"));
    getFavoriteMovies(profileId)
      .then((response) => {
        setFavoriteMovies(
          response?.attributes.favorite_films.data.map((film) => film.id)
        );
      })
      .catch(() => {
        throw new Error("Wystąpił nieoczekiwany błąd");
      });
  }, [reloadValueCheck]);

  return favoriteMovies;
};

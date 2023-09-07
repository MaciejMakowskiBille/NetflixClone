import { useEffect, useState } from "react";
import { useFavoriteMoviesIds } from "./useFavoriteMoviesIds";
import { getFilms } from "../utils/Gets";

export const useFavoriteMoviesData = () => {
  const [favoriteMoviesData, setFavoriteMoviesData] =
    useState<MovieDataType[]>([]);
  const favoriteMoviesIds = useFavoriteMoviesIds({
    reloadValueCheck: null,
  });

  useEffect(() => {
    getFilms()
      .then((response) => {
        const newFilms: MovieDataType[] | null = [];
        response?.forEach((film) => {
          if (favoriteMoviesIds?.includes(film.id)) {
            newFilms.push(film);
          }
        });
        setFavoriteMoviesData(newFilms);
      })
      .catch(() => {
        throw new Error("Wystąpił nieoczekiwany błąd");
      });
  }, [favoriteMoviesIds]);

  return favoriteMoviesData;
};

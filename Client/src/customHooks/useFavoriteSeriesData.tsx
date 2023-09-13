import { useEffect, useState } from "react";
import { getSeries } from "../utils/Gets";
import { useFavoriteSeriesIds } from "./useFavoriteSeriesIds";

export const useFavoriteSeriesData = () => {
  const [favoriteSeriesData, setFavoriteSeriesData] =
    useState<SeriesDataType[]>([]);
  const favoriteSeriesIds = useFavoriteSeriesIds({
    reloadValueCheck: null,
  });

  useEffect(() => {
    getSeries()
      .then((response) => {
        const newSeries: SeriesDataType[] | null = [];
        response?.forEach((series) => {
          if (favoriteSeriesIds?.includes(series.id)) {
            newSeries.push(series);
          }
        });
        setFavoriteSeriesData(newSeries);
      })
      .catch(() => {
        throw new Error("Wystąpił nieoczekiwany błąd");
      });
  }, [favoriteSeriesIds]);

  return favoriteSeriesData;
};

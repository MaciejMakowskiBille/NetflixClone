import { useEffect, useState } from "react";
import { getFavoriteSeries } from "../utils/Gets";

export const useFavoriteSeriesIds = ({
  reloadValueCheck,
}: {
  reloadValueCheck: any;
}) => {
  const [favoriteSeries, setFavoriteSeries] = useState<number[] | null>();

  useEffect(() => {
    const profileId = Number(localStorage.getItem("profileId"));
    getFavoriteSeries(profileId)
      .then((response) => {
        setFavoriteSeries(
          response?.attributes.favorite_series.data.map((series) => series.id)
        );
      })
      .catch(() => {
        throw new Error("Wystąpił nieoczekiwany błąd");
      });
  }, [reloadValueCheck]);

  return favoriteSeries;
};

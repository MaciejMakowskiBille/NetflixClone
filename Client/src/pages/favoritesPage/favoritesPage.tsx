import { useState } from "react";
import Navigation from "../../components/Navigation/nav";
import { FilterDropdown } from "./components/filterDropdown";
import { useFavoriteMoviesData } from "../../customHooks/useFavoriteMoviesData";
import { useFavoriteSeriesData } from "../../customHooks/useFavoriteSeriesData";
import CategoryRow from "../../components/CategoryRow/categoryRow";

export type ContentType = {
  name: string;
  enabled: boolean;
}[];

const FavoritesPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [arrowIconDirection, setarrowIconDirection] = useState<"up" | "down">(
    "down"
  );
  const [filters, setFilters] = useState<ContentType>([
    {
      name: "Filmy",
      enabled: true,
    },
    {
      name: "Seriale",
      enabled: true,
    },
  ]);
  const favoriteMoviesData = useFavoriteMoviesData();
  const favoriteSeriesData = useFavoriteSeriesData();

  const toggleFilters = (index: number) => {
    setFilters((prev) =>
      prev.map((filter, filterIndex) => {
        if (filterIndex === index) {
          return { ...filter, enabled: !filter.enabled };
        }
        return filter;
      })
    );
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
    setarrowIconDirection((prev) => (prev === "down" ? "up" : "down"));
  };

  return (
    <div className="appBackground">
      <Navigation />
      <main className="columnDisplay">
        <header className="favorites__header">
          <div className="favorites__header--title">
            <span>Moja lista</span>
            <div className="icon iconButton activeFavButton" />
          </div>
          <FilterDropdown
            arrowIconDirection={arrowIconDirection}
            showDropdown={showDropdown}
            filters={filters}
            toggleFilter={toggleFilters}
            toggleDropdown={toggleDropdown}
          />
        </header>
        <section className="favorites__rows">
          {filters[0].enabled? <CategoryRow title="Filmy" moviesList={favoriteMoviesData} /> : null}
          {filters[1].enabled? <CategoryRow title="Seriale" moviesList={favoriteSeriesData} />: null}
        </section>
      </main>
    </div>
  );
};

export default FavoritesPage;

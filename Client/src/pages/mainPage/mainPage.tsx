import Navigation from "../../components/Navigation/nav";
import Producer from "../../components/Producer/producer";
import CategoryRow from "../../components/CategoryRow/categoryRow";
import { useState, useEffect } from "react";
import {
  getCategories,
  getFilms,
  getProducersLimit,
  getSeries,
} from "../../utils/Gets";
import Slider from "../../components/Slider/slider";

const MainPage = () => {
  const [moviesData, setMoviesData] = useState<MovieDataType[] | null>(null);
  const [seriesData, setSeriesData] = useState<SeriesDataType[] | null>(null);
  const [combinedData, setCombinedData] = useState<CombinedDataType>([]);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [producers, setProducers] = useState<Producer[] | null>(null);

  useEffect(() => {
    getProducersLimit(6)
      .then((res) => {
        setProducers(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(true);
      });
    getSeries()
      .then((res) => {
        setSeriesData(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(true);
      });
    getFilms()
      .then((res) => {
        setMoviesData(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(true);
      });
    getCategories()
      .then((res) => {
        setCategories(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(true);
      });
  }, []);
  useEffect(() => {
    if (moviesData && seriesData) {
      setCombinedData([...moviesData, ...seriesData]);
    } else if (moviesData) {
      setCombinedData(moviesData);
    } else if (seriesData) {
      setCombinedData(seriesData);
    }
  }, [moviesData, seriesData]);

  return (
    <>
      <div className="appBackground">
        <Navigation />
        <main>
          <Slider />
          <div className="producersList">
            {producers &&
              producers.map((prod) => {
                return (
                  <Producer key={prod.id} name={prod.name} image={prod.image} />
                );
              })}
          </div>
          {!isLoading &&
            moviesData &&
            categories &&
            categories.map((category) => {
              return (
                <CategoryRow
                  key={category.id}
                  title={category.name}
                  moviesList={combinedData}
                />
              );
            })}
        </main>
      </div>
    </>
  );
};
export default MainPage;

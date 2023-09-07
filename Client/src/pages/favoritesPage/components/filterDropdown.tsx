import { motion } from "framer-motion";
import { ContentType } from "../favoritesPage";

type FilterDropdownProps = {
  arrowIconDirection: "up" | "down";
  showDropdown: boolean;
  filters: ContentType;
  toggleDropdown: () => void;
  toggleFilter: (index: number) => void;
};

export const FilterDropdown = ({
  arrowIconDirection,
  showDropdown,
  filters,
  toggleFilter,
  toggleDropdown,
}: FilterDropdownProps) => {
  const boxAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    transition: {
      duration: 0.1,
    },
  };

  return (
    <div className="favorites__header--dropdown">
      <button
        className={`favorites__header--dropdown__button ${
          arrowIconDirection === "up" ? "up" : ""
        }`}
        onClick={toggleDropdown}
      >
        Wyszukaj
        <img
          src="/src/imgs/icons/arrow.svg"
          className={`favorites__header--dropdown__button--arrow__${arrowIconDirection}`}
        />
      </button>
      {showDropdown ? (
        <motion.div
          initial={boxAnimation.initial}
          animate={boxAnimation.animate}
          transition={boxAnimation.transition}
          className="favorites__header--dropdown__box"
        >
          <div className="favorites__header--dropdown__box--filters">
            {filters.map((filter, index) => (
              <div
                key={index}
                className={`favorites__header--dropdown__box--filters__option${
                  filter.enabled ? "--active" : ""
                }`}
                onClick={() => toggleFilter(index)}
              >
                {filter.name}
              </div>
            ))}
          </div>
          <input placeholder="Wyszukaj po tytule"></input>
        </motion.div>
      ) : null}
    </div>
  );
};

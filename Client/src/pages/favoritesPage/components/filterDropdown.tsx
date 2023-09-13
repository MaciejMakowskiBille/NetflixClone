import { motion } from "framer-motion";
import { ContentType } from "../favoritesPage";
import { useState } from "react";

type FilterDropdownProps = {
  arrowIconDirection: "up" | "down";
  showDropdown: boolean;
  filters: ContentType;
  searchValue: string;
  toggleDropdown: () => void;
  toggleFilter: (index: number) => void;
  setSearchValue: (value: string) => void;
};

export const FilterDropdown = ({
  arrowIconDirection,
  showDropdown,
  filters,
  searchValue,
  toggleFilter,
  toggleDropdown,
  setSearchValue,
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

  const [formValue, setFormValue] = useState(searchValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value.toLowerCase());
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(formValue);
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
          <form
            className="favorites__header--dropdown__box--search"
            onSubmit={handleSearch}
          >
            <input
              name="search"
              type="search"
              placeholder="Wpisz tytuł"
              value={formValue}
              onChange={handleChange}
            ></input>
            <button type="submit">Wyszukaj</button>
          </form>
        </motion.div>
      ) : null}
    </div>
  );
};

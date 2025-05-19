import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CategoryGroupKey } from "../../../types/category";
import { categoryGroups } from "../../../utils/categoryGroups";
import { Product } from "../../../types/product";
import { sortByValues } from "../../../utils/sortByValues";

interface FilterAndSortPanelProps {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  openCategoryGroup: CategoryGroupKey | "";
  isPanelOpen: boolean;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
  originalData: Product[] | undefined;
  setDisplayedData: Dispatch<SetStateAction<Product[] | undefined>>;
  displayedData: Product[] | undefined;
}

const FilterAndSortPanel = ({
  selectedCategories,
  setSelectedCategories,
  openCategoryGroup,
  isPanelOpen,
  setIsPanelOpen,
  originalData,
  setDisplayedData,
}: FilterAndSortPanelProps) => {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<string>();

  // toggle category in selectedCategories and update path
  const handleCategorySelection = (category: string) => {
    let updatedCategories: string[];

    if (selectedCategories.includes(category)) {
      //remove from selected
      updatedCategories = selectedCategories.filter(
        (existingCategory) => existingCategory !== category,
      );
    } else {
      //add to selected
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
    const categoryPath = updatedCategories.join("+");
    navigate(`/shop/${categoryPath}`);
  };

  const handleRemoveAll = () => {
    setSelectedCategories([]);
    setDisplayedData(originalData);
    setSortBy("");
    navigate("/shop");
  };

  //sort original data based on sorting option
  useEffect(() => {
    if (!sortBy || !originalData) return;
    const sorted = [...originalData];

    switch (sortBy) {
      case "priceLow":
        sorted?.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "alphabetAZ":
        sorted?.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alphabetZA":
        sorted?.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        return;
    }
    setDisplayedData(sorted);
  }, [sortBy, originalData, setDisplayedData]);

  return (
    <section
      id="filter&sort-panel"
      aria-label="Filter and sort panel"
      className={`${isPanelOpen ? "" : "hidden"} fixed top-0 z-30 flex h-full w-full md:top-[7vh] md:h-[93vh]`}
    >
      {/*  TRANSPARENT OVERLAY - CLOSE PANEL */}
      <div
        aria-label="close panel"
        className="bg-black/40 md:w-3/5 lg:w-5/7 2xl:w-4/5"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      ></div>
      {/* PANEL */}
      <div className="flex w-full flex-col justify-between bg-white pt-[7vh] text-black outline md:w-2/5 md:pt-0 lg:w-2/7 2xl:w-1/5">
        <div>
          {/* FILTERING OPTIONS */}
          <div className="m-5 border-b">
            <h1 className="mb-5 text-center text-xl">SELECTED CATEGORIES</h1>
            {openCategoryGroup && (
              <ul className="ml-5 flex flex-col gap-2 pb-5 font-light">
                {categoryGroups[openCategoryGroup].map((category: string) => (
                  <div className="flex gap-1" key={category}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategorySelection(category)}
                    />
                    <li>{category.toUpperCase().replace("-", " ")}</li>
                  </div>
                ))}
                {/* SELECT ALL BTN */}
                <button
                  className="cursor-pointer border"
                  onClick={() =>
                    setSelectedCategories(categoryGroups[openCategoryGroup])
                  }
                >
                  SELECT ALL
                </button>
              </ul>
            )}
          </div>
          {/* SORTING OPTION */}
          <div className="m-5 border-b">
            <h1 className="mb-5 text-center text-xl">SORT BY</h1>
            <ul className="ml-5 flex flex-col gap-2 pb-5 font-light">
              {sortByValues.map((item) => (
                <div className="flex gap-1" key={item.id}>
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === item.sortBy}
                    onChange={() => setSortBy(item.sortBy)}
                  />
                  <li>{item.name}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="mx-2 flex gap-2 border-t border-black/10 py-5">
          <button
            className="h-[5vh] w-1/2 cursor-pointer border"
            onClick={handleRemoveAll}
          >
            REMOVE ALL
          </button>
          <button
            aria-label="Apply and close panel"
            aria-controls="filter&sort-panel"
            className="h-[5vh] w-1/2 cursor-pointer border"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            APPLY
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterAndSortPanel;

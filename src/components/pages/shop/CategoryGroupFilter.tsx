import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { categoryGroups } from "../../../utils/categoryGroups";
import { useNavigate } from "react-router-dom";
import { CategoryGroupKey } from "../../../types/category";
import { motion } from "framer-motion";

interface CategoryGroupFilterProps {
  isPanelOpen: boolean;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  openCategoryGroup: CategoryGroupKey | "";
  setOpenCategoryGroup: Dispatch<SetStateAction<CategoryGroupKey | "">>;
}

const CategoryGroupFilter = ({
  isPanelOpen,
  setIsPanelOpen,
  selectedCategories,
  setSelectedCategories,
  openCategoryGroup,
  setOpenCategoryGroup,
}: CategoryGroupFilterProps) => {
  const navigate = useNavigate();

  //state for filter animation on mobile when navbar rolls in
  const [isMdScreen, setIsMdScreen] = useState(false);
  const [moveFilter, setMoveFilter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleCategoryGroupSelection = (group: CategoryGroupKey) => {
    if (openCategoryGroup !== group) {
      const newCategories = categoryGroups[group];
      setOpenCategoryGroup(group); // set group for fetching
      setSelectedCategories(newCategories); // select whole category group
      navigate(`/shop/${newCategories.join("+")}/1`);
    } else {
      return;
    }
  };

  // on load page handle
  useEffect(() => {
    if (selectedCategories.length > 0) {
      //get any category from selected group
      const firstCategory = selectedCategories[0];
      //find category group it belongs to
      const groupWithCategory = Object.entries(categoryGroups).find(
        ([_, categories]) => categories.includes(firstCategory),
      );
      //set open category group on load to match selected categories
      if (groupWithCategory) {
        setOpenCategoryGroup(groupWithCategory[0] as CategoryGroupKey);
      }
    }
  }, [selectedCategories, setOpenCategoryGroup]);

  //move filter only below md screens
  useEffect(() => {
    const handleResize = () => {
      const currentScreenSize = window.innerWidth;
      if (currentScreenSize < 768) {
        setIsMdScreen(true);
      } else {
        setIsMdScreen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //move filter if navbar appears
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling down
        setMoveFilter(true);
      } else {
        // scrolling up
        setMoveFilter(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* PANEL FOR SELECTING CATEGORY GROUPS */}
      <motion.div
        initial={{ top: 0 }}
        animate={{ top: isMdScreen ? (moveFilter ? 0 : "9vh") : "7vh" }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-20 overflow-x-auto bg-white outline outline-black md:top-[7vh]"
      >
        <ul className="flex flex-wrap items-center justify-center gap-y-0 text-black">
          {Object.entries(categoryGroups).map(([group]) => (
            <li
              aria-haspopup={true}
              aria-expanded={openCategoryGroup === group}
              aria-controls="products-display"
              key={group}
              className={`h-full cursor-pointer px-1 py-1 text-[10px] sm:text-xs md:py-4 lg:px-4 lg:text-sm 2xl:text-base ${openCategoryGroup === group ? "bg-gray-300" : ""}`}
              onClick={() =>
                handleCategoryGroupSelection(group as CategoryGroupKey)
              }
            >
              {group.toUpperCase().replace("NS", "NS ")}
            </li>
          ))}
        </ul>
      </motion.div>
      {/* FILTER & SORT BTN TRIGGER - MOBILE */}
      <button
        className="h-[5vh] w-full cursor-pointer bg-black p-1 text-sm text-white md:hidden"
        onClick={() => setIsPanelOpen(true)}
      >
        <div
          aria-haspopup={true}
          aria-expanded={isPanelOpen}
          aria-controls="filter&sort-panel"
          className="flex h-full items-center justify-center border"
        >
          FILTER & SORT
        </div>
      </button>
    </>
  );
};

export default CategoryGroupFilter;

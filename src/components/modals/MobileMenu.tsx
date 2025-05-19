import { useMemo, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { Link, useNavigate } from "react-router";
import { categoryGroups } from "../../utils/categoryGroups";
import { CategoryGroupKey } from "../../types/category";
import { useCategoryByGroupQuery } from "../../hooks/product/useCategoryByGroupQuery";
import SimpleLoader from "../common/SimpleLoader";
import { useIsMenuOpenStore } from "../../store/useIsMenuOpenStore";

const MobileMenu = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<string>(
    "WomensFashion" as CategoryGroupKey,
  );

  //queries
  const { data, isLoading, error } = useCategoryByGroupQuery(
    selectedGroup as CategoryGroupKey,
  );
  const randomizedData = useMemo(() => {
    if (!data) return [];
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [data]);

  //global state
  const user = useUserStore((state) => state.user);
  const { isMenuOpen, closeMenu } = useIsMenuOpenStore();

  const handleClick = (route: string) => {
    navigate(route);
    closeMenu();
  };

  return (
    <section
      id="menu"
      role="dialog"
      className={`${isMenuOpen ? "fixed md:hidden" : "hidden"} z-30 flex h-[100vh] w-full flex-col items-start gap-2 bg-white text-black`}
    >
      {/* CATEGORIES NAV - TO SHOP */}
      <section className="mt-[10vh] flex w-full flex-col items-center">
        <h1 className="p-2 text-2xl font-semibold">START SHOPPING</h1>
        <ul
          aria-label="Product categories"
          className="grid grid-cols-2 gap-2 pt-[2vh]"
        >
          {Object.entries(categoryGroups).map(([group]) => (
            <li
              key={group}
              onClick={closeMenu}
              className="border-b border-black/20 text-xs"
            >
              <Link
                to={`/shop/${categoryGroups[group as CategoryGroupKey].join("+")}`}
                key={group}
              >
                {group.toUpperCase().replace("NS", "NS ")}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {/* LOGIN / PROFILE BTN */}
      <section className="w-full py-[5vh] text-center">
        {user && (
          <button
            role="link"
            onClick={() => handleClick("/profile")}
            className="m-auto mt-[2vh] cursor-pointer rounded-lg bg-black p-2 px-5 text-white"
          >
            PROFILE
          </button>
        )}
        {!user && (
          <>
            <h1>HAVE AN ACCOUNT?</h1>
            <button
              role="link"
              className="m-auto mt-[2vh] cursor-pointer rounded-lg bg-black p-2 px-5 text-white"
              onClick={() => handleClick("/login")}
            >
              LOG IN
            </button>
          </>
        )}
      </section>
      {/* CATEGORIES DISPLAY */}
      <section aria-label="Products preview" className="w-full">
        <h1 className="w-full border-y border-black/20 text-center font-medium">
          BROWSE CATEGORIES
        </h1>
        {/* CATEGORY SELECTION PANEL */}
        <ul
          aria-label="Select category"
          className="scrollbar-hidden flex overflow-y-auto border-b border-black/20"
        >
          {Object.entries(categoryGroups).map(([group]) => (
            <li
              key={group}
              className={`${selectedGroup === group ? "border-b text-black" : "text-black/50"} bg-white text-[10px]`}
            >
              <button
                className="h-full w-full p-2"
                onClick={() => setSelectedGroup(group)}
              >
                {group.toUpperCase().replace("NS", "NS ")}
              </button>
            </li>
          ))}
        </ul>
        {/* CATEGORY ITEMS DISPLAY */}
        <div
          className="scrollbar-hidden relative flex gap-2 overflow-x-auto border-b border-black/20 p-2"
          aria-live="polite"
        >
          {isLoading && (
            <div className="h-[20vh]">
              <SimpleLoader loaderText="Loading products" />
            </div>
          )}
          {error && <h1>{error.message}</h1>}
          {data &&
            randomizedData.map((product) => (
              <div
                onClick={() => handleClick(`/product/${product.id}`)}
                className="bg-seashell flex-shrink-0"
                key={product.id}
              >
                <img
                  role="link"
                  src={product.images[0]}
                  alt={product.title}
                  className="h-[20vh] w-[25vw] object-cover"
                />
              </div>
            ))}
        </div>
      </section>
    </section>
  );
};

export default MobileMenu;

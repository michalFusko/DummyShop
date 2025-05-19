import ProductCard from "../../cards/ProductCard";
import { useCategoryByGroupQuery } from "../../../hooks/product/useCategoryByGroupQuery";
import { useMemo } from "react";
import { categoryGroups } from "../../../utils/categoryGroups";
import { Link } from "react-router-dom";
import { CategoryGroupKey } from "../../../types/category";

interface FeaturedCategoryProps {
  categoryGroup: keyof typeof categoryGroups;
}

const FeaturedCategory = ({ categoryGroup }: FeaturedCategoryProps) => {
  const { data, isLoading, error } = useCategoryByGroupQuery(categoryGroup);

  // memorize shuffled products so they dont change during scroll
  const selectedProducts = useMemo(() => {
    if (!data) return [];
    const shuffledProducts = [...data].sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, 4);
  }, [data]);

  return (
    <section aria-label="Category preview" className="h-[180vh]">
      {/* BLURRY BG AND TEXT ABOVE HOMEPAGE BG */}
      <header className="absolute flex h-[100vh] w-full items-center justify-center bg-black/20 backdrop-blur-md">
        <div className="relative flex flex-col items-center justify-center">
          <span className="absolute -top-8 right-0 text-white/70 md:text-xl">
            [ LIVE NOW ]
          </span>
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            {categoryGroup.toUpperCase()}
          </h1>
          <p className="mt-5 text-white/70 md:text-xl">SHOP NOW</p>
        </div>
      </header>
      {/* CATEGORY PANEL */}
      {isLoading && (
        <div className="absolute mt-[100vh] flex h-[80vh] w-full items-center justify-center bg-white text-black">
          Loading featured category...
        </div>
      )}
      {error && (
        <div className="absolute mt-[100vh] flex h-[80vh] w-full items-center justify-center bg-white text-black">
          Error loading category.
        </div>
      )}
      {data && (
        <section className="absolute mt-[100vh] h-[80vh] w-full bg-white">
          {/* CATEGORY HEADER */}
          <header className="flex h-[10vh] items-center justify-between border-b px-2 text-black sm:px-10 md:px-20">
            <div className="flex flex-col items-end">
              <span className="text-[10px] md:text-sm">[2025]</span>
              <h1 className="text-2xl font-semibold md:text-4xl">
                {categoryGroup.toUpperCase()}
              </h1>
            </div>
            <div className="relative min-h-12 min-w-26">
              {/* EXTENDING BORDERS AROUND VIEW ALL BTN */}
              <div className="absolute left-2 h-full border-l"></div>
              <div className="absolute right-2 h-full border-r"></div>
              <div className="absolute top-2 w-full border-t"></div>
              <div className="absolute bottom-2 w-full border-b"></div>
              <div className="flex min-h-12 min-w-26 items-center justify-center">
                <Link
                  to={`/shop/${categoryGroups[categoryGroup as CategoryGroupKey].join("+")}`}
                >
                  <button className="h-8 w-22 cursor-pointer bg-black text-xs font-light text-white">
                    VIEW ALL
                  </button>
                </Link>
              </div>
            </div>
          </header>
          {/* CATEGORY PRODUCTS DISPLAY */}
          <section
            aria-label="Categorey products display"
            className="scrollbar-hidden grid auto-cols-[50%] grid-flow-col overflow-x-auto border-black lg:auto-cols-[25%]"
          >
            {selectedProducts.map((product) => (
              //height is passed in vh units
              <ProductCard key={product.id} height={70} product={product} />
            ))}
          </section>
        </section>
      )}
    </section>
  );
};

export default FeaturedCategory;

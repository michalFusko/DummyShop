import { Dispatch, SetStateAction } from "react";
import HeroSvg from "../../../../public/svg/HeroSvg";
import { CategoryGroupKey } from "../../../types/category";

interface ProductsHeroProps {
  isPanelOpen: boolean;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
  openCategoryGroup: CategoryGroupKey | "";
}

const heroImages: Record<CategoryGroupKey, string> = {
  WomensFashion: "/images/hero-images/womens-fashion-hero.jpg",
  MensFashion: "/images/hero-images/mens-fashion-hero.jpg",
  Accessories: "/images/hero-images/accessories-hero.jpg",
  Home: "/images/hero-images/home-hero.jpg",
  Beauty: "/images/hero-images/beauty-hero.jpg",
  Electronics: "/images/hero-images/electronics-hero.jpg",
  Vehicles: "/images/hero-images/vehicles-hero.jpg",
  Sports: "/images/hero-images/sports-hero.jpg",
  Groceries: "/images/hero-images/groceries-hero.jpg",
};

const ProductsHero = ({
  isPanelOpen,
  setIsPanelOpen,
  openCategoryGroup,
}: ProductsHeroProps) => {
  //get image for selected category
  const imgSrc =
    (openCategoryGroup && heroImages[openCategoryGroup]) ||
    "/images/hero-images/womens-fashion-hero.jpg";

  const imgWithCacheBuster = `${imgSrc}?v=${openCategoryGroup}`; // avoids image lag when quickly changing categories

  return (
    // HERO SECTION WITH CATEGORY-SPECIFIC IMAGE AND FILTER/SORT BTN
    <header className="flex h-[50vh] flex-col bg-white md:flex-row">
      {/*  TEXT & BTN & SVG*/}
      <section className="flex h-full w-full border-none text-black md:w-3/5 md:border-r">
        <div className="flex h-full w-full flex-col items-center justify-end gap-2 p-2 md:w-4/6 md:items-start md:justify-center md:p-10">
          <h1 className="text-xl">DUMMY SHOP</h1>
          <p className="text-sm font-extralight">
            Diverse collection, bringing together fashion, accessories, home
            essentials, beauty, electronics, and more—crafted for style,
            comfort, and everyday living.
          </p>
        </div>
        {/* BTN &  SVG - DESKTOP ONLY */}
        <div className="relative hidden w-2/6 items-end p-0 pb-5 md:flex xl:p-14">
          <div className="absolute top-1/3 -right-[73px]">
            <HeroSvg />
          </div>

          <div className="relative min-h-18 min-w-38">
            {/* EXTENDING BUTTON BORDER STYLES */}
            <div className="absolute left-3 h-full border-l"></div>
            <div className="absolute right-3 h-full border-r"></div>
            <div className="absolute top-3 w-full border-t"></div>
            <div className="absolute bottom-3 w-full border-b"></div>
            <div className="flex min-h-18 min-w-38 items-center justify-center">
              <button
                aria-haspopup={true}
                aria-expanded={isPanelOpen}
                aria-controls="filter&sort-panel"
                className="h-12 w-32 cursor-pointer bg-black text-sm font-light text-white"
                onClick={() => setIsPanelOpen(true)}
              >
                FILTER & SORT
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* IMAGE */}
      <aside className="flex h-[30vh] w-full items-center justify-center border-black md:h-full md:w-2/5 md:border-l">
        <img
          src={imgWithCacheBuster}
          alt="Category-image"
          className="h-full w-full object-cover p-2"
        />
      </aside>
    </header>
  );
};

export default ProductsHero;

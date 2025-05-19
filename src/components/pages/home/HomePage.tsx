import { IoIosArrowDropdown } from "react-icons/io";
import Categories from "./Categories";
import { SetStateAction, useEffect, useState, Dispatch } from "react";
import FeaturedCategory from "./FeaturedCategory";

interface HomepageProps {
  windowHeight: number;
  setWindowHeight: Dispatch<SetStateAction<number>>;
  scrollY: number;
  setScrollY: Dispatch<SetStateAction<number>>;
}

const HomePage = ({
  windowHeight,
  setWindowHeight,
  scrollY,
  setScrollY,
}: HomepageProps) => {
  const [imgSrc, setImgSrc] = useState("/images/homepage.jpg"); //default for initial load
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      // hiding shop now btn after scrolling past landing page so it doesnt appear above featured category bg
      if (currentScroll < windowHeight) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }

      // dynamic bg based on scroll
      //featured category = 1.8vh
      // 0-1x: landing, 1-2.8x: accessories, 2.8-4.6x: electronics, > 4.6x: vehicles
      if (currentScroll < windowHeight) {
        setImgSrc("/images/homepage.jpg");
      } else if (currentScroll < windowHeight * 2.8) {
        setImgSrc("/images/hero-images/accessories-hero.jpg");
      } else if (currentScroll < windowHeight * 4.6) {
        setImgSrc("/images/hero-images/electronics-hero.jpg");
      } else {
        setImgSrc("/images/hero-images/vehicles-hero.jpg");
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [windowHeight, setWindowHeight, scrollY, setScrollY]);

  return (
    <section aria-label="Home page" className="relative h-full bg-white">
      {/* LANDING PAGE */}
      <section className="sticky top-0 left-0 h-screen">
        <img
          src={imgSrc}
          alt="background-image"
          className="h-screen w-full object-cover object-center"
        />
        {/* DYNAMINC BTN */}
        <button
          aria-label="Scroll to featured categories"
          className={` ${showContent ? "absolute" : "hidden"} top-[80vh] right-[10vw] flex cursor-pointer gap-10 text-4xl font-medium text-white md:gap-30 md:text-6xl xl:text-8xl`}
          onClick={() => {
            //categories section changes height on mobile
            const isMobile = window.innerWidth < 768;
            const scrollLength = isMobile
              ? windowHeight * 1
              : windowHeight * 0.93;
            window.scrollTo({ top: scrollLength, behavior: "smooth" });
          }}
        >
          <IoIosArrowDropdown
            style={{
              strokeWidth: 15,
              filter: "drop-shadow(1px 5px 5px black)",
            }}
            className="textShadow3DRightHalf"
          />
          <h2 style={{ textShadow: "1px 5px 5px black" }}>Shop now</h2>
        </button>
      </section>
      <main>
        {/* MULTIPLE CATEGORIES FEATURE */}
        <Categories />
        {/* INDIVIDUAL CATEGORY FEATURES */}
        <FeaturedCategory categoryGroup={"Accessories"} />
        <FeaturedCategory categoryGroup={"Electronics"} />
        <FeaturedCategory categoryGroup={"Vehicles"} />
      </main>
    </section>
  );
};

export default HomePage;

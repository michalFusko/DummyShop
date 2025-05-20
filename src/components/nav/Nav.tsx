import { Link, useLocation } from "react-router";
import Dropdown from "./Dropdown";
import NavSearch from "./NavSearch";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useIsCartOpenStore } from "../../store/useIsCartOpenStore";
import { useCartStore } from "../../store/useCartStore";
import { useIsMenuOpenStore } from "../../store/useIsMenuOpenStore";
import { motion } from "framer-motion";

interface NavProps {
  windowHeight: number;
}

const Nav = ({ windowHeight }: NavProps) => {
  //navbar animation
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  //search and dropdown visibility
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  //global state
  const user = useUserStore((state) => state.user);
  const selectedProducts = useCartStore((state) => state.selectedProducts);
  const { isCartOpen, openCart } = useIsCartOpenStore();
  const { isMenuOpen, openMenu, closeMenu } = useIsMenuOpenStore();

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  //homepage case where link doesnt scroll to top
  const handleLogoClickScroll = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  //closing menu while on mobile
  const handleLogoClickMobile = () => {
    handleLogoClickScroll();
    closeMenu();
  };
  const handleOpenBagMobile = () => {
    openCart();
    closeMenu();
  };

  //hover gap workaround for transition from nav to dropdown
  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setIsDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 120);
  };

  //navbar animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  //CONTAINS BOTH DESKTOP AND MOBILE VERSION
  return (
    <header className="relative z-50">
      {/* DESKTOP NAV ***********************/}
      <div>
        {/* transparent on homepage until first section reach */}
        <nav
          role="navigation"
          aria-label="Main navigation desktop"
          className={`${isHomePage && scrollY < windowHeight * 0.92 ? "bg-black/30 text-white backdrop-blur-sm" : "bg-white text-black"} fixed top-0 left-0 z-50 hidden h-[7vh] w-full items-center justify-between border-b text-[10px] font-light md:flex lg:text-sm`}
        >
          {/* LEFT SIDE */}
          <ul className="flex h-full w-[35%] justify-between">
            {/* shipping */}
            <li className="flex flex-1 flex-col items-center justify-center border-r bg-black text-[10px] leading-3 text-white xl:text-sm xl:leading-4">
              <h2 className="font-light">FREE SHIPPING</h2>
              <p className="text-center font-extralight">
                ON ORDERS ABOVE 100$
              </p>
            </li>
            {/* SHOP / DROPDOWN TRIGGER */}
            <li
              className="flex flex-1 items-center justify-center border-r"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              aria-controls="categories"
            >
              <Link
                to={"/shop"}
                className="cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                SHOP NOW
              </Link>
            </li>
            {/* BRAND */}
            <li className="flex flex-1 items-center justify-center border-r">
              <Link to="/about">ABOUT US</Link>
            </li>
          </ul>
          {/* MIDDLE */}
          <div className="w-[30%]">
            <Link to={"/"} onClick={handleLogoClickScroll}>
              <h1 className="text-center text-2xl font-semibold">DUMMY SHOP</h1>
            </Link>
          </div>
          {/* RIGHT SIDE */}
          <ul className="flex h-full w-[35%] justify-between">
            {/* SEARCH / SEARCH BAR TRIGGER */}
            <li className="flex flex-1 items-center justify-center border-l">
              <button
                onClick={() => setIsSearching(!isSearching)}
                className="cursor-pointer"
                aria-haspopup="dialog"
                aria-controls="search-bar"
                aria-expanded={isSearching}
              >
                SEARCH
              </button>
            </li>
            {/* LOGIN / PROFILE */}
            <li className="flex flex-1 items-center justify-center border-l">
              {user ? (
                <Link to={"/profile"}>PROFILE</Link>
              ) : (
                <Link to={"/login"}>LOGIN</Link>
              )}
            </li>
            {/* CART */}
            <li className="flex flex-1 items-center justify-center border-l bg-black text-white">
              <button
                onClick={openCart}
                className="cursor-pointer"
                aria-haspopup="dialog"
                aria-controls="shopping-cart"
                aria-expanded={isCartOpen}
              >
                YOUR BAG ({selectedProducts.length})
              </button>
            </li>
          </ul>
        </nav>

        {/* USER INTERACTIONS */}
        <NavSearch isSearching={isSearching} setIsSearching={setIsSearching} />
        <Dropdown
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      </div>

      {/* MOBILE NAV *****************************/}
      <motion.nav
        initial={{ top: 0 }}
        animate={{ top: showNav ? 0 : "-9.5vh" }}
        transition={{ duration: 0.5 }}
        role="navigation"
        aria-label="Main navigation mobile"
        className="fixed flex w-full px-[2vh] pt-[2vh] md:hidden"
      >
        <div className="flex h-[7vh] w-full items-center justify-center bg-white text-black outline">
          {/* LEFT SIDE - LOGO */}
          <div className="flex h-full w-1/2 items-center justify-start border-r pl-2 text-lg leading-4 font-bold">
            <Link to={"/"} onClick={handleLogoClickMobile}>
              <h1>
                DUMMY <br /> SHOP
              </h1>
            </Link>
          </div>
          {/* RIGHT SIDE  */}
          <ul className="flex h-full w-1/2 items-center">
            {/* SEARCH */}
            <li className="flex h-full flex-1 items-center justify-center text-xs">
              <button
                onClick={() => setIsSearching(!isSearching)}
                className="cursor-pointer"
                aria-haspopup="dialog"
                aria-controls="search-bar"
                aria-expanded={isSearching}
              >
                SEARCH
              </button>
            </li>
            {/* MENU */}
            <li className="flex h-full flex-1 items-center justify-center border-l text-xs">
              {!isMenuOpen && (
                <button
                  className="cursor-pointer"
                  onClick={openMenu}
                  aria-haspopup="dialog"
                  aria-controls="menu"
                  aria-expanded={isMenuOpen}
                >
                  MENU
                </button>
              )}
              {isMenuOpen && (
                <button
                  aria-controls="menu"
                  className="cursor-pointer"
                  onClick={closeMenu}
                >
                  [CLOSE]
                </button>
              )}
            </li>
            {/* CART */}
            <li className="flex h-full flex-1 items-center justify-center border-l text-xs">
              <button
                onClick={handleOpenBagMobile}
                className="cursor-pointer"
                aria-haspopup="dialog"
                aria-controls="shopping-cart"
                aria-expanded={isCartOpen}
              >
                BAG({selectedProducts.length})
              </button>
            </li>
          </ul>
        </div>
      </motion.nav>
    </header>
  );
};

export default Nav;

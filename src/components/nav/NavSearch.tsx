import { Dispatch, SetStateAction, useState } from "react";
import SearchCard from "../cards/SearchCard";
import { FaArrowRight } from "react-icons/fa";
import { useSearchQuery } from "../../hooks/product/useSearchQuery";
import { useNavigate } from "react-router";
import { useIsMenuOpenStore } from "../../store/useIsMenuOpenStore";
import { AnimatePresence, motion } from "framer-motion";

interface SearchProps {
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
}

const NavSearch = ({ isSearching, setIsSearching }: SearchProps) => {
  const navigate = useNavigate();
  //search endpoint
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, error } = useSearchQuery(searchTerm);

  const closeMenu = useIsMenuOpenStore((state) => state.closeMenu);

  //load search results page and close searchbar & menu if open on mobile
  const handleSearchFor = () => {
    navigate(`/search/${searchTerm}/1`);
    setIsSearching(!isSearching);
    closeMenu();
  };

  return (
    <AnimatePresence>
      {isSearching && (
        <motion.section
          initial={{
            top: "-100vh",
          }}
          animate={{
            top: "0",
          }}
          transition={{
            ease: "circInOut",
            duration: 0.15,
          }}
          exit={{
            top: "-100vh",
          }}
          id="search"
          role="dialog"
          className={`fixed top-0 left-0 z-55 h-[100vh] w-full px-[2vh] pt-[2vh] text-black md:px-0 md:pt-0`}
        >
          <div className="bg-white">
            {/* SEARCH BAR */}
            <div className="flex h-[7vh] outline">
              {/* FIELD */}
              <input
                type="text"
                placeholder="SEARCH"
                className="w-full pl-[2vh] outline-none md:pl-[7vh]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search for products"
              />
              {/* CLOSE BUTTON */}
              <button
                aria-label="Close search"
                className="flex w-[7vh] cursor-pointer items-center justify-center border-x"
                onClick={() => setIsSearching(!isSearching)}
              >
                X
              </button>
            </div>
            {/* SEARCH RESULTS DROPDOWN */}
            <section
              aria-live="polite"
              aria-label="Search results"
              className="flex flex-col"
            >
              {/* RESPONSE HANDLERS */}
              {isLoading && <div className="mx-5">Products are loading...</div>}
              {error && <div className="mx-5">{error.message}</div>}
              {data?.length === 0 && (
                <div className="mx-5">No products found for: {searchTerm}</div>
              )}
              {/* RESULTS DISPLAY */}
              {data && data?.length > 0 && (
                <div aria-live="polite">
                  <h1 className="mx-5 mb-[2vh] flex h-[5vh] items-center border-b border-black/20 text-sm">
                    PRODUCTS
                  </h1>
                  <div className="scrollbar-hidden flex h-[55vh] gap-[2vh] overflow-x-auto overflow-y-hidden border-b border-black/20 pb-[2vh]">
                    {data?.slice(0, 6).map((product, index) => (
                      <div
                        key={product.id}
                        className={`${index > 3 ? "block md:hidden xl:block" : ""} w-2/5 shrink-0 md:shrink`}
                      >
                        <SearchCard
                          product={product}
                          setIsSearching={setIsSearching}
                          setSearchTerm={setSearchTerm}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
            {/* SEARCH COMPONENT REDIRECT */}
            {searchTerm && (
              <button
                role="link"
                aria-label="Go to search page"
                className="hover:bg-seashell flex h-[8vh] w-full cursor-pointer items-center justify-between border-b px-5"
                onClick={handleSearchFor}
              >
                <p>SEARCH FOR "{searchTerm}"</p>
                <FaArrowRight />
              </button>
            )}
          </div>
          {/* CLOSE SEARCH TRANSPARENT OVERLAY*/}
          <div
            aria-label="Close search"
            className="h-full w-full"
            onClick={() => setIsSearching(!isSearching)}
          ></div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default NavSearch;

import { IoSearch } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { useSearchQuery } from "../../../hooks/product/useSearchQuery";
import ProductCard from "../../cards/ProductCard";
import { useEffect, useState } from "react";
import SimpleLoader from "../../common/SimpleLoader";

const SearchPage = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  /**  SEARCH */
  const [searchTermState, setSearchTermState] = useState<string>("");
  const { searchTerm } = useParams<{ searchTerm?: string }>();
  const { data, isLoading, error } = useSearchQuery(searchTermState);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTermState.trim()) return;
    navigate(`/search/${searchTermState.trim()}`);
  };

  //sync input state with url param on load
  useEffect(() => {
    if (searchTerm !== undefined) {
      setSearchTermState(searchTerm);
    }
  }, [searchTerm]);

  /** PAGINATION  ************************************************************************************************/
  const [sliceIndex, setSliceIndex] = useState<number>(0); //representing one page of products
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [amountOfProducts, setAmountOfProducts] = useState<number>(10); //amount of products displayed
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); //fors displaying products on different screens
  const [triggerScroll, setTriggerScroll] = useState(false); //to not fire scroll to ref on load

  //dead ends for pagination
  const disabledPrev = !data || sliceIndex - amountOfProducts < 0;
  const disabledNext =
    !data || sliceIndex + amountOfProducts > data!.length - 1;

  const handlePrevClick = () => {
    const nextPage = selectedPage - 1;
    if (disabledPrev) return;
    setSliceIndex((prev) => prev - amountOfProducts);
    setSelectedPage(nextPage);
    navigate(`/search/${searchTerm}/${nextPage}`);
    setTriggerScroll(true);
  };
  const handleNextClick = () => {
    const nextPage = selectedPage + 1;
    if (disabledNext) return;
    setSliceIndex((prev) => prev + amountOfProducts);
    setSelectedPage(nextPage);
    navigate(`/search/${searchTerm}/${nextPage}`);
    setTriggerScroll(true);
  };

  //dynamically setting amount of displayed products to always fit grid wit full row of products
  useEffect(() => {
    const setWidht = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", setWidht);

    if (windowWidth > 1773) setAmountOfProducts(10);
    if (windowWidth < 1773 && windowWidth > 1407) setAmountOfProducts(8);
    if (windowWidth < 1406) setAmountOfProducts(6);
    return () => {
      window.removeEventListener("resize", setWidht);
    };
  }, [windowWidth]);

  //get page from path & set page and slice index to display correct page on load
  useEffect(() => {
    if (!page || !amountOfProducts) return;
    const pageNumber = +page;
    setSelectedPage(pageNumber);
    setSliceIndex((pageNumber - 1) * amountOfProducts);
  }, [page, amountOfProducts]);

  //when amountOfProducts is set(on resize) set slice index and page to default so displayed data doesnt get mixed up
  useEffect(() => {
    if (!page) {
      setSliceIndex(0);
      setSelectedPage(1);
    }
  }, [setSelectedPage, setSliceIndex, page]);

  //when selected page changes, scroll to top of the section
  useEffect(() => {
    if (!triggerScroll) return;
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setTriggerScroll(false);
  }, [selectedPage, triggerScroll]);

  return (
    <section
      aria-label="Search page"
      className="mt-[7vh] min-h-[50vh] bg-white text-black"
    >
      <header>
        <h1 className="pt-[5vh] text-center text-2xl">SEARCH</h1>
      </header>
      <form
        className="mx-5 mb-[7vh] flex h-[5vh] items-center justify-between border-b px-2"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none"
          value={searchTermState}
          onChange={(e) => setSearchTermState(e.target.value)}
        />
        <button
          className="flex h-full w-[5vh] cursor-pointer items-center justify-center border border-black/10"
          type="submit"
        >
          <IoSearch size={20} />
        </button>
      </form>
      <section>
        <main aria-label="Search results">
          {isLoading && (
            <div className="relative h-[70vh] w-full">
              <SimpleLoader loaderText="LOADING PRODUCTS" />
            </div>
          )}

          {error && (
            <div className="flex h-[70vh] w-full items-center justify-center">
              <p className="text-xs">
                OOPS! SOMETHING WENT WRONG WHILE LOADING PRODUCTS. TRY
                REFRESHING THE PAGE.
              </p>
            </div>
          )}

          {data && (
            <div className="grid grid-cols-2 border-t border-black lg:grid-cols-3 2xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
              {data
                ?.slice(sliceIndex, sliceIndex + amountOfProducts)
                .map((product) => (
                  //height passed in vh value
                  <ProductCard key={product.id} height={60} product={product} />
                ))}
            </div>
          )}
        </main>
        {data && data?.length > amountOfProducts && (
          <div className="flex h-full w-full items-center justify-center py-[2vh]">
            <button
              disabled={disabledPrev}
              onClick={handlePrevClick}
              className={`${disabledPrev ? "cursor-default text-black/70" : "cursor-pointer"} border-y border-l border-black p-2`}
            >
              PREV
            </button>
            <h1 className="h-full border-y p-2 font-medium">{selectedPage}</h1>
            <button
              disabled={disabledNext}
              onClick={handleNextClick}
              className={`${disabledNext ? "cursor-default text-black/70" : "cursor-pointer"} border-y border-r border-black p-2`}
            >
              NEXT
            </button>
          </div>
        )}
      </section>
    </section>
  );
};

export default SearchPage;

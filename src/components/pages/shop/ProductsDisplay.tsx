import ProductCard from "../../cards/ProductCard";
import { Product } from "../../../types/product";
import SimpleLoader from "../../common/SimpleLoader";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
interface ProductsDisplayProps {
  sliceIndex: number;
  setSliceIndex: Dispatch<SetStateAction<number>>;
  selectedPage: number;
  setSelectedPage: Dispatch<SetStateAction<number>>;
  amountOfProducts: number;
  setAmountOfProducts: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  error: Error | null;
  selectedCategories: string[];
  displayedData: Product[] | undefined;
}

const ProductsDisplay = ({
  sliceIndex,
  setSliceIndex,
  selectedPage,
  setSelectedPage,
  amountOfProducts,
  setAmountOfProducts,
  isLoading,
  error,
  selectedCategories,
  displayedData,
}: ProductsDisplayProps) => {
  const navigate = useNavigate();
  const { categoryPath } = useParams();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerScroll = useRef(false);
  //dead ends for pagination
  const disabledPrev = !displayedData || sliceIndex - amountOfProducts < 0;
  const disabledNext =
    !displayedData || sliceIndex + amountOfProducts > displayedData!.length - 1;

  const handlePrevClick = () => {
    if (disabledPrev) return;
    const newPage = selectedPage - 1;
    setSliceIndex((prev) => prev - amountOfProducts);
    setSelectedPage(newPage);
    triggerScroll.current = true;
    navigate(`/shop/${categoryPath}/${newPage}`);
  };
  const handleNextClick = () => {
    if (disabledNext) return;
    const newPage = selectedPage + 1;
    setSliceIndex((prev) => prev + amountOfProducts);
    setSelectedPage(newPage);
    triggerScroll.current = true;
    navigate(`/shop/${categoryPath}/${newPage}`);
  };

  //dynamically setting amount of displayed products to always fit grid wit full row of products if theres enough
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1773) setAmountOfProducts(10);
      else if (width > 1407) setAmountOfProducts(8);
      else setAmountOfProducts(6);
    };
    handleResize(); // set on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setAmountOfProducts]);

  //when selected page changes, scroll to top of the section
  //doesnt scroll when coming from links because i dont provide page in links
  //disabled scrolltotop component for this case
  useEffect(() => {
    if (!triggerScroll.current || isLoading || !sectionRef.current) return;

    const elementTop = sectionRef.current.getBoundingClientRect().top;
    const offset = window.scrollY + elementTop - window.innerHeight * 0.13;
    window.scrollTo({
      top: offset,
      behavior: "auto",
    });
    triggerScroll.current = false;
  }, [selectedPage, isLoading]);

  return (
    <section
      aria-label="Products display"
      id="products-display"
      className="2xl:p-2"
      ref={sectionRef}
    >
      {/* DATA DISPLAY */}
      <main className="grid w-full grid-cols-2 border-black md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        {isLoading && (
          <div className="relative flex h-[50vh] w-full text-black">
            <SimpleLoader loaderText="LOADING PRODUCTS" />
          </div>
        )}
        {error && (
          <div className="flex h-[50vh] w-[100vw] items-center justify-center">
            <p className="border-b border-red-400 text-center text-xs text-black">
              OOPS! SOMETHING WENT WRONG WHILE LOADING PRODUCTS. TRY REFRESHING
              THE PAGE.
            </p>
          </div>
        )}
        {selectedCategories.length === 0 ? (
          <p className="my-[20vh] w-[95vw] text-center text-2xl font-bold text-black">
            Please select category from above to show products.
          </p>
        ) : (
          displayedData
            ?.slice(sliceIndex, sliceIndex + amountOfProducts)
            .map((product) => (
              <ProductCard key={product.id} height={40} product={product} />
            ))
        )}
      </main>
      {/* BUTTONS FOR PAGINATION */}
      {selectedCategories?.length > 0 &&
        displayedData &&
        displayedData?.length > amountOfProducts && (
          <div className="flex h-full w-full items-center justify-center py-[2vh]">
            <button
              disabled={disabledPrev}
              onClick={handlePrevClick}
              className={`${disabledPrev ? "cursor-default text-black/50" : "cursor-pointer"} border-y border-l border-black p-2`}
            >
              PREV
            </button>
            <h1 className="h-full border-y p-2 font-medium">{selectedPage}</h1>
            <button
              disabled={disabledNext}
              onClick={handleNextClick}
              className={`${disabledNext ? "cursor-default text-black/50" : "cursor-pointer"} border-y border-r border-black p-2`}
            >
              NEXT
            </button>
          </div>
        )}
    </section>
  );
};

export default ProductsDisplay;

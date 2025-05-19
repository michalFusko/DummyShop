import { useEffect, useRef, useState } from "react";
import { Product } from "../../../../types/product";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ProductDetails from "../singleProductDisplay/ProductDetails";
import { useCartStore } from "../../../../store/useCartStore";
import { useIsCartOpenStore } from "../../../../store/useIsCartOpenStore";

interface SingleProductMobileProps {
  data: Product;
}

const SingleProductMobile = ({ data }: SingleProductMobileProps) => {
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const scrollRef = useRef<HTMLDivElement>(null);

  const setProduct = useCartStore((state) => state.setProduct);
  const { isCartOpen, openCart } = useIsCartOpenStore();

  //scrolls image carousel horizontally when buttons are clicked
  const handleScrollImg = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -viewportWidth : viewportWidth,
      behavior: "smooth",
    });
  };
  //adding product to cart and opening modal
  const handleAddProduct = () => {
    setProduct(data);
    openCart();
  };

  //updates viewport width on resize to make sure scroll matches screen size
  useEffect(() => {
    const getViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    getViewportWidth();

    window.addEventListener("resize", getViewportWidth);
    return () => {
      window.removeEventListener("resize", getViewportWidth);
    };
  }, []);

  return (
    <section className="mt-[-20vh] bg-white text-black">
      {/* STICKY BAR */}
      <div className="sticky top-[80vh] z-10 flex h-[20vh] flex-col bg-white text-sm">
        <h1 className="flex w-full flex-1 items-center justify-center font-medium outline">
          {data.title}
        </h1>
        <span className="flex w-full flex-1 items-center justify-center font-light">
          {data.price}$
        </span>
        <div className="flex w-full flex-2 cursor-pointer items-center justify-center bg-black font-semibold text-white">
          <button
            aria-haspopup={true}
            aria-expanded={isCartOpen}
            onClick={handleAddProduct}
            aria-controls="shopping-cart"
            className="flex h-[80%] w-[95%] items-center justify-center border border-white"
          >
            ADD TO BAG
          </button>
        </div>
      </div>
      {/* SCROLL BUTTONS */}
      <button
        aria-label="Scroll carousel left"
        className="absolute top-[45%] left-[6vw] z-10 cursor-pointer rounded-full bg-black/20 text-white"
        onClick={() => handleScrollImg("left")}
      >
        <MdKeyboardArrowLeft size={30} />
      </button>
      <button
        aria-label="Scroll carousel right"
        className="absolute top-[45%] right-[6vw] z-10 cursor-pointer rounded-full bg-black/20 text-white"
        onClick={() => handleScrollImg("right")}
      >
        <MdKeyboardArrowRight size={30} />
      </button>
      {/* SCROLLABLE PRODUCT IMAGES  */}
      <div
        aria-label="Product images"
        className="scrollbar-hidden relative flex h-[73vh] overflow-x-auto border-y"
        ref={scrollRef}
      >
        {data &&
          data.images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`product-image-#${index}`}
              className="bg-seashell mx-[5vw] h-full w-[90vw] flex-shrink-0 border-x object-cover object-center"
            />
          ))}
      </div>
      {/* PRODUCT DESCRIPTION */}
      <ProductDetails hideContent={true} product={data} />
      <p className="p-5 text-sm">{data.description}</p>
      {/* FILLER TO MAKE STICKY BAR FIT BELOW CONTENT */}
      <div className="h-[20vh] w-full bg-white"></div>
    </section>
  );
};

export default SingleProductMobile;

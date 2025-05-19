import { useState } from "react";
import ProductDetails from "./ProductDetails";

import { descriptionSnippets } from "../../../../utils/descriptionSnippets";
import { Product } from "../../../../types/product";
import { useCartStore } from "../../../../store/useCartStore";
import { useIsCartOpenStore } from "../../../../store/useIsCartOpenStore";

interface ProductDetailsStickyContainerProps {
  data: Product;
}

const ProductDetailsStickyContainer = ({
  data,
}: ProductDetailsStickyContainerProps) => {
  //select one snippet for each of 3 arrays
  const [snippetsToShow] = useState(() =>
    descriptionSnippets.map(
      (group) => group[Math.floor(Math.random() * group.length)],
    ),
  );

  const setProduct = useCartStore((state) => state.setProduct);
  const { isCartOpen, openCart } = useIsCartOpenStore();

  //adding product to cart and opening modal
  const handleAddProduct = () => {
    setProduct(data);
    openCart();
  };

  return (
    <section className="sticky top-[7vh] flex h-[93vh] w-full flex-col items-end border-l">
      {/* RIGHT HALF */}
      <div className="flex h-[84vh] w-2/5 items-center border-l">
        {/* SHOP RELATED TEXT - RIGHT SIDE - LEFT HALF */}
        <div
          aria-hidden="true"
          className="hidden h-full w-2/5 items-center overflow-hidden text-4xl font-extrabold lg:flex lg:w-1/2 lg:text-5xl 2xl:text-7xl"
        >
          <div className="bg-seashell m-2 flex h-[98%] w-full flex-col items-center justify-around overflow-hidden py-10">
            <div className="text-center">
              <p>DUMMY</p>
              <p>SHOP®</p>
              <p>-</p>
            </div>
            <div className="text-center">
              <p>SINCE 2025</p>
              <p>-</p>
            </div>
            <div className="text-center">
              <p>LIVE</p>
              <p>LOVE</p>
              <p>DUMMY</p>
            </div>
          </div>
        </div>
        {/* PRODUCTS DETAILS - RIGHT SIDE - RIGHT HALF */}
        <ProductDetails product={data} />
      </div>
      {/* BOTTOM */}
      <div className="flex h-[9vh] w-full outline">
        {/* SNIPPETS - BOTTOM - LEFT */}
        <div
          aria-hidden="true"
          className="flex w-3/5 items-center justify-around bg-white text-sm font-bold lg:pl-20 lg:text-base"
        >
          {snippetsToShow.map((snippet, index) => (
            <p key={index}>{snippet.toUpperCase()}</p>
          ))}
        </div>
        {/* BTN - BOTTOM - RIGHT */}
        <div
          aria-haspopup={true}
          aria-expanded={isCartOpen}
          aria-controls="shopping-cart"
          className="flex w-2/5 cursor-pointer items-center justify-center border-black bg-black font-semibold text-white"
          onClick={handleAddProduct}
        >
          ADD TO BAG
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsStickyContainer;

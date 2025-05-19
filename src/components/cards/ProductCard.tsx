import { FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import { useProductModalStore } from "../../store/useProductModalStore";
import { Product } from "../../types/product";
import { useState } from "react";
import SimpleLoader from "../common/SimpleLoader";

interface ProductCardProps {
  height: number;
  product: Product;
}

const ProductCard = ({ product, height }: ProductCardProps) => {
  // didnt choose thumbnail as img, because of unconsistency in bg color, product images are bigger and need loader
  const [isLoading, setIsLoading] = useState(true);

  const { isOpen, openModal } = useProductModalStore();
  return (
    <div
      aria-label="Product card"
      style={{ height: `${height}vh` }}
      className="overflow-hidden border-r border-b bg-white text-black"
    >
      {/* IMAGE */}
      <Link to={`/product/${product?.id}`}>
        <div className="bg-seashell relative h-[80%] w-full cursor-pointer">
          {isLoading && <SimpleLoader loaderText="image is loading" />}
          <img
            src={product?.images[0]}
            alt={product.title}
            className="h-full w-full object-contain"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </Link>
      {/* NAME & PRICE & ADD BTN */}
      <div className="flex h-[20%] min-h-12 w-full justify-start border-t md:justify-between">
        <div className="ml-2 flex flex-4 flex-col justify-center gap-1 leading-2 md:flex-3 lg:gap-2 2xl:flex-4">
          <h1 className="text-[10px] leading-3 font-semibold sm:text-xs md:text-sm md:leading-5 lg:text-base">
            {product?.title.toUpperCase()}
          </h1>
          <p className="font-extralight text-black/70">{product?.price}$</p>
        </div>
        <button
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="product-modal"
          className="flex h-full flex-2 cursor-pointer items-center justify-center bg-black text-white md:flex-1"
          onClick={() => openModal(product)}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

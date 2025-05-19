import { useState } from "react";
import { IoStar } from "react-icons/io5";
import ProductExpandable from "./ProductExpandable";
import { Product } from "../../../../types/product";

interface ProductDetailsProps {
  product: Product | null;
  hideContent?: boolean;
}

const ProductDetails = ({ product, hideContent }: ProductDetailsProps) => {
  const [openSections, setOpenSections] = useState<string | null>(null);

  const toggleSection = (name: string) => {
    setOpenSections((prev) => (prev === name ? null : name));
  };

  return (
    <section
      aria-label="Product details"
      className="flex h-full w-full flex-col justify-end bg-white text-black outline lg:w-1/2"
    >
      {/* PRODUCT DESCRIPTION */}
      {!hideContent && (
        <div className="m-4 h-auto text-base md:block">
          <h1 className="font-semibold">{product?.title.toUpperCase()}</h1>
          <span className="font-extralight text-black/70">
            {product?.price}$
          </span>
          <p className="text-xs">{product?.description}</p>
        </div>
      )}
      {/* PRODUCT MORE INFO */}
      <div className="flex h-auto flex-col md:px-2">
        {/* REWIEVS*/}
        <ProductExpandable
          isOpen={openSections === "REVIEWS"}
          setIsOpen={() => toggleSection("REVIEWS")}
          name={"REWIEVS"}
        >
          <ul className="flex flex-col gap-2 text-black/70">
            {product?.reviews.map((review, index) => (
              <li key={index}>
                <h1>-{review.reviewerName}</h1>
                <p>{review.comment}</p>
                <span className="flex items-center gap-2 border-b">
                  <p className="pt-1">{review.rating}</p>
                  <IoStar />
                </span>
              </li>
            ))}
          </ul>
          <span className="ml-8 flex items-center gap-2">
            <p className="pt-1">RATING - {product?.rating}</p>
            <IoStar />
          </span>
        </ProductExpandable>
        {/* DIMENSIONS*/}
        <ProductExpandable
          isOpen={openSections === "DIMENSIONS"}
          setIsOpen={() => toggleSection("DIMENSIONS")}
          name={"DIMENSIONS"}
        >
          {product?.dimensions && (
            <ul className="flex flex-col gap-2 text-black/70">
              {Object.entries(product.dimensions).map(([key, value]) => (
                <li key={key} className="border-b">
                  {key}: {value}
                </li>
              ))}
              <li className="border-b">weight: {product?.weight}</li>
            </ul>
          )}
        </ProductExpandable>
        {/* RETURN & SHIPPING & WARRANTY */}
        <ProductExpandable
          isOpen={openSections === "RETURN"}
          setIsOpen={() => toggleSection("RETURN")}
          name={"RETURN & SHIPPING & WARRANTY"}
        >
          <ul className="flex flex-col gap-2 text-black/70">
            <li className="border-b">{product?.returnPolicy}</li>
            <li className="border-b">{product?.shippingInformation}</li>
            <li className="border-b">{product?.warrantyInformation}</li>
          </ul>
        </ProductExpandable>
      </div>
      {/* AVAILABILITY */}
      <div className="flex flex-col items-center justify-center bg-white text-sm md:mt-10">
        <div className="flex h-6 w-full items-center justify-between px-4 outline">
          <h2>AVAILABILITY:</h2>
          <h2>{product?.availabilityStatus}</h2>
        </div>
        {typeof product?.stock === "number" && (
          <div className="flex h-10 items-center text-xs">
            {product?.stock === 0 && <p>This Product Is Out Of Stock</p>}
            {product?.stock === 1 && (
              <p>We have {product?.stock} product in stock</p>
            )}
            {product?.stock > 1 && (
              <p>We have {product?.stock} products in stock</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;

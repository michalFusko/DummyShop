import { Product } from "../../../../types/product";
import ProductDetailsStickyContainer from "./ProductDetailsStickyContainer";

interface SingleProductDisplayProps {
  data: Product;
}

const SingleProductDisplay = ({ data }: SingleProductDisplayProps) => {
  return (
    <section className="relative flex min-h-[93vh] w-full flex-col">
      {/* STICKY PART - DESCRIPTION, SNIPPETS */}
      <ProductDetailsStickyContainer data={data} />
      {/* LEFT SIDE - IMAGES */}
      <section className="mt-[-93vh] mb-[9vh] w-3/5">
        <div className="ml-4 flex flex-wrap items-center justify-center">
          {data &&
            data.images.map((image: string, index: number) => (
              <div
                key={index}
                className={`h-[84vh] w-1/2 border-b p-2 ${
                  index % 2 === 0 ? "border-x" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`Products image #${index}`}
                  className="bg-seashell h-full w-full object-contain 2xl:object-cover"
                />
              </div>
            ))}
        </div>
      </section>
    </section>
  );
};

export default SingleProductDisplay;

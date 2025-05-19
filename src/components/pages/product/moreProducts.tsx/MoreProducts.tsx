import { useCategoryQuery } from "../../../../hooks/product/useCategoryQuery";
import ProductCard from "../../../cards/ProductCard";

interface MoreProductsProps {
  category: string;
  productId: number;
}

const MoreProducts = ({ category, productId }: MoreProductsProps) => {
  const { data, isLoading, error } = useCategoryQuery(category);

  return (
    <section aria-label="Recommended products" className="h-full">
      <h1 className="flex h-[12vh] items-center justify-center border-b pt-[2vh] text-lg font-bold outline sm:text-xl">
        MORE PRODUCTS YOU MIGHT LIKE
      </h1>
      {isLoading && (
        <div className="flex h-[70vh] items-center justify-center border-y border-black">
          Loading...
        </div>
      )}
      {error && (
        <div className="flex h-[70vh] items-center justify-center border-y border-black">
          {error.message}
        </div>
      )}
      {data && (
        <div className="grid grid-cols-2 border-black md:auto-cols-[25%] md:grid-flow-col">
          {data
            ?.filter((product) => product.id !== productId)
            .slice(0, 4)
            .map((product) => (
              <div key={product.id}>
                <ProductCard height={70} product={product} />
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default MoreProducts;

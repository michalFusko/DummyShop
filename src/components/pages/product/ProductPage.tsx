import { useParams } from "react-router";
import MoreProducts from "./moreProducts.tsx/MoreProducts";
import SingleProductDisplay from "./singleProductDisplay/SingleProductDisplay";
import { useProductQuery } from "../../../hooks/product/useProductQuery";
import SimpleLoader from "../../common/SimpleLoader";
import SingleProductMobile from "./singleProductMobile/SingleProductMobile";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, error } = useProductQuery(+productId!);

  return (
    <section
      aria-label="Product page"
      className="w-full bg-white pt-[7vh] text-black"
    >
      {isLoading && (
        <div className="flex h-[100vh] w-full items-center justify-center md:h-[93vh]">
          <SimpleLoader loaderText="LOADING PRODUCT" />
        </div>
      )}
      {error && (
        <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-10 md:h-[93vh]">
          <p className="border-b border-red-400 text-xs">
            OOPS! SOMETHING WENT WRONG WHILE LOADING PRODUCTS. TRY REFRESHING
            THE PAGE.
          </p>
        </div>
      )}
      {data && (
        <>
          <main>
            {/* DESKTOP */}
            <div className="hidden md:block">
              <SingleProductDisplay data={data} />
            </div>
            {/* MOBILE */}
            <div className="block md:hidden">
              <SingleProductMobile data={data} />
            </div>
          </main>
          <aside>
            <MoreProducts category={data?.category} productId={data?.id} />
          </aside>
        </>
      )}
    </section>
  );
};

export default ProductPage;

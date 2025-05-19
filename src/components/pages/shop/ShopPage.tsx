import { useEffect, useState } from "react";
import CategoryGroupFilter from "./CategoryGroupFilter";
import ProductsDisplay from "./ProductsDisplay";
import ProductsHero from "./ProductsHero";
import { useParams } from "react-router";
import { CategoryGroupKey } from "../../../types/category";
import FilterAndSortPanel from "./FilterAndSortPanel";
import { useCategoryByGroupQuery } from "../../../hooks/product/useCategoryByGroupQuery";
import { Product } from "../../../types/product";

const ShopPage = () => {
  const { categoryPath, page } = useParams();
  // pagination logic
  const [sliceIndex, setSliceIndex] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [amountOfProducts, setAmountOfProducts] = useState<number>(10);

  // group to fetch data for
  const [openCategoryGroup, setOpenCategoryGroup] = useState<
    CategoryGroupKey | ""
  >("");
  // panel visibility
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  // filter logic
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // sorting logic
  const [originalData, setOriginalData] = useState<Product[] | undefined>();
  const [displayedData, setDisplayedData] = useState<Product[] | undefined>();
  //query for whole category group for cache to persist after local filtering
  const { data, isLoading, error } = useCategoryByGroupQuery(openCategoryGroup);

  // get categories from path & set them to apply filtering of selected category group on load
  useEffect(() => {
    if (categoryPath) {
      const categories = categoryPath.split("+");
      setSelectedCategories(categories);
    }
  }, [categoryPath]);

  //get page from path & set page and slice index to display correct page on load
  useEffect(() => {
    if (
      !page ||
      !displayedData ||
      displayedData.length === 0 ||
      !amountOfProducts
    )
      return;
    const pageNumber = +page;
    setSelectedPage(pageNumber);
    setSliceIndex((pageNumber - 1) * amountOfProducts);
  }, [page, displayedData, amountOfProducts]);

  // filter and foundation for sorting
  useEffect(() => {
    if (data) {
      // filter data to include only products of selected categories(from path)
      const filteredData = data?.filter((product) =>
        selectedCategories.includes(product.category),
      );
      //reset page and shown products whenever data are filtered
      setSelectedPage(1);
      setSliceIndex(0);
      setOriginalData(filteredData); // store data for future sorting
      setDisplayedData(filteredData); // show filtered data imediately
    }
  }, [data, selectedCategories]);

  return (
    <section aria-label="Shop page" className="mt-[2vh] bg-white md:mt-[7vh]">
      <ProductsHero
        // includes DESKTOP filter&sort trigger btn and dynamic hero image
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        openCategoryGroup={openCategoryGroup}
      />
      <CategoryGroupFilter
        // includes MOBILE filter&sort trigger btn
        //sets category group for fetching
        //handles selecting categorygroup onload by finding out which categorygroup includes selected categories from path
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        openCategoryGroup={openCategoryGroup}
        setOpenCategoryGroup={setOpenCategoryGroup}
      />
      <ProductsDisplay
        //local pagination and data display
        sliceIndex={sliceIndex}
        setSliceIndex={setSliceIndex}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        isLoading={isLoading}
        error={error}
        selectedCategories={selectedCategories}
        displayedData={displayedData}
        amountOfProducts={amountOfProducts}
        setAmountOfProducts={setAmountOfProducts}
      />
      <FilterAndSortPanel
        //handles specific category selection from category group
        //handles sorting selected categories
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        openCategoryGroup={openCategoryGroup}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        originalData={originalData}
        setDisplayedData={setDisplayedData}
        displayedData={displayedData}
      />
    </section>
  );
};

export default ShopPage;

import { useQuery } from "@tanstack/react-query";
import { categoryGroups } from "../../utils/categoryGroups";
import { CategoryGroupKey } from "../../types/category";
import { Product } from "../../types/product";

/**
 * hook fetches all products from categoryGroup
 *
 * @param groupKey a key representing group of categories  (mens-x, mens-y...)
 * @returns a list of products from all categories belonging to categoryGroup
 *
 * - maps trough every category from selected categorGroup
 * - fetches products from each category
 * - flattens the product arrays into one list
 */

export const useCategoryByGroupQuery = (groupKey: CategoryGroupKey | "") => {
  return useQuery<Product[]>({
    queryKey: ["categoryByGroup", groupKey],
    queryFn: async () => {
      const categoryList = categoryGroups[groupKey as CategoryGroupKey];
      const requests = categoryList.map((category) =>
        fetch(`https://dummyjson.com/products/category/${category}`).then(
          async (res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch category: ${category}`);
            }
            const data = await res.json();
            return data.products;
          },
        ),
      );

      const results = await Promise.all(requests);
      const allProducts = results.flat();
      return allProducts;
    },
    enabled: !!groupKey, // run only if truthy
  });
};

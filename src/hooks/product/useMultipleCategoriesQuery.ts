import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/product";

/**
 * hook fetches all products of multiple categories
 *
 * @param categories string array representing selected categories to fetch products from
 * @returns a list of products from all given categories
 *
 * - maps trough each category of products
 * - fetches products from each category
 * - flattens the product arrays into one list
 */

export const useMultipleCategoriesQuery = (categories: string[]) => {
  return useQuery<Product[]>({
    queryKey: ["multipleCategories", categories],
    queryFn: async () => {
      const requests = categories.map((category) =>
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
  });
};

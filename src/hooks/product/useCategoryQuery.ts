import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/product";

/**
 * hook fetches all products from a single category
 *
 * @param categoryKey a key representing a single category of products
 * @returns a list of products in specific category
 */

export const useCategoryQuery = (categoryKey: string) => {
  return useQuery<Product[]>({
    queryKey: ["category", categoryKey],
    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${categoryKey}`,
      );

      const data = await res.json();
      if (!res.ok || !data.products.length) {
        throw new Error("No products found in this category");
      }
      return data.products;
    },
  });
};

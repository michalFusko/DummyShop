import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/product";
/**
 * hook fetches all products corresponding to search term
 *
 * @param searchTerm is a string representing users input for search
 * @returns list of products corresponding to searchterm
 */
export const useSearchQuery = (searchTerm: string | undefined) => {
  return useQuery<Product[] | undefined>({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchTerm}`,
      );
      if (!res.ok) throw new Error(`No products for "${searchTerm}" found.`);
      const data = await res.json();
      return data.products;
    },
    enabled: !!searchTerm,
  });
};

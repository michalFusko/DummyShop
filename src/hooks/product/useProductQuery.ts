import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/product";
/**
 * hook fetches single product
 *
 * @param productId id of single product
 * @returns object response of product
 */
export const useProductQuery = (productId: number) => {
  return useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/product/${productId}`);
      if (!res.ok)
        throw new Error(`Error fetching product with id ${productId}.`);
      return res.json();
    },
    enabled: !!productId,
  });
};

import { useQuery } from "@tanstack/react-query";
import { CartProductSummary } from "../../types/cart";

/**
 * @param userId
 * @returns list of products in users cart
 */

export const useGetUsersCartQuery = (userId: number | undefined) => {
  return useQuery<CartProductSummary[]>({
    queryKey: ["users-cart", userId],
    queryFn: async () => {
      const res = await fetch(`https://dummyjson.com/carts/${userId}`);
      if (!res.ok) throw new Error(`Error fetching users cart. ID:${userId}`);
      const data = await res.json();
      return data.products;
    },
    enabled: !!userId,
  });
};

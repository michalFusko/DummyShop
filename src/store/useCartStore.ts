import { create } from "zustand";
import { UseCartStoreInterface } from "../types/cart";
import { persist } from "zustand/middleware";

/**
 * stores products with quantity
 * -adding
 * -updating
 * -removing
 * -clearing
 *
 * - uses local storage persistence with key "cart"
 */

export const useCartStore = create<UseCartStoreInterface>()(
  persist(
    (set) => ({
      //list of products in cart
      selectedProducts: [],
      //adds product to the cart
      // - used to handle adding from product cards/pages
      //- if it exists increments quantity by 1
      //- if not adds with qty of 1
      setProduct: (product) =>
        set((state) => {
          const existingProduct = state.selectedProducts.find(
            (item) => item.product.id === product.id,
          );
          if (existingProduct) {
            return {
              selectedProducts: state.selectedProducts.map((item) =>
                item.product.id === product.id
                  ? { ...item, qty: item.qty + 1 }
                  : item,
              ),
            };
          } else {
            return {
              selectedProducts: [
                ...state.selectedProducts,
                { product, qty: 1 },
              ],
            };
          }
        }),
      //adds product with specified quantinty
      // - used when transfering products from users stored cart including quantities
      // - if item is already in cart adds quantity
      // - if not adds item with given qty
      setProductWithQty: (product, qty) =>
        set((state) => {
          const existingProduct = state.selectedProducts.find(
            (item) => item.product.id === product.id,
          );
          if (existingProduct) {
            return {
              selectedProducts: state.selectedProducts.map((item) =>
                item.product.id === product.id
                  ? { ...item, qty: item.qty + qty }
                  : item,
              ),
            };
          } else {
            return {
              selectedProducts: [
                ...state.selectedProducts,
                { product, qty: qty },
              ],
            };
          }
        }),
      // used in cart modal to change quantity
      incrementProductQty: (productId) =>
        set((state) => ({
          selectedProducts: state.selectedProducts.map((item) =>
            item.product.id === productId
              ? { ...item, qty: item.qty + 1 }
              : item,
          ),
        })),
      decrementProductQty: (productId) =>
        set((state) => {
          const updatedCart = state.selectedProducts.map((item) =>
            item.product.id === productId
              ? { ...item, qty: item.qty - 1 }
              : item,
          );
          const filteredCart = updatedCart.filter((item) => item.qty > 0);
          return { selectedProducts: filteredCart };
        }),
      //removes single products
      removeProduct: (productId) =>
        set((state) => ({
          selectedProducts: state.selectedProducts.filter(
            (item) => item.product.id !== productId,
          ),
        })),
      //clears whole cart
      clearCart: () => set({ selectedProducts: [] }),
    }),
    { name: "cart" }, //key for local storage
  ),
);

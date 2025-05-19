import { create } from "zustand";
import { UseIsCartOpenStoreInterface } from "../types/cart";

//for setting cart modal visibility

export const useIsCartOpenStore = create<UseIsCartOpenStoreInterface>(
  (set) => ({
    isCartOpen: false,
    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
  }),
);

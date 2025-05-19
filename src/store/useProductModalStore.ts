import { UseProductModalStoreInterface } from "../types/product";
import { create } from "zustand";

//handles specific product modal visibility

export const useProductModalStore = create<UseProductModalStoreInterface>(
  (set) => ({
    isOpen: false,
    product: null,
    openModal: (product) => set({ isOpen: true, product }), //opens modal for given product
    closeModal: () => set({ isOpen: false }),
  }),
);

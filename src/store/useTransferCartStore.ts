import { create } from "zustand";
import { UseTransferCartStoreInterface } from "../types/cart";

// used to manage tranfering items between main cart and users cart

export const useTransferCartStore = create<UseTransferCartStoreInterface>(
  (set) => ({
    keepItems: true,
    transferItems: false,
    setKeepItems: (value) => set({ keepItems: value }),
    setTransferItems: (value) => set({ transferItems: value }),
  }),
);

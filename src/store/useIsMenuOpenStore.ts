import { create } from "zustand";

interface useIsMenuOpenStoreInterface {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useIsMenuOpenStore = create<useIsMenuOpenStoreInterface>(
  (set) => ({
    isMenuOpen: false,
    openMenu: () => set({ isMenuOpen: true }),
    closeMenu: () => set({ isMenuOpen: false }),
  }),
);

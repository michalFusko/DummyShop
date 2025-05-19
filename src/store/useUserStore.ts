import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UseUserStoreInterface } from "../types/user";

/**
 * set/clear user state
 * - persists user data to local storage witch key "user-storage"
 */

export const useUserStore = create<UseUserStoreInterface>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage", //key for local storage
    },
  ),
);

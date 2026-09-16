"use client";

type WishlistStore = {
  ids: Set<string>;
  setIds: (ids: string[]) => void;
  toggle: (id: string) => void;
};

export const useWishlistStore = create<WishlistStore>((set) => ({
  ids: new Set(),
  setIds: (ids) => set({ ids: new Set(ids) }),
  toggle: (id) =>
    set((state) => {
      const newIds = new Set(state.ids);
      if (newIds.has(id)) {
        newIds.delete(id);
"use client";

type WishlistStore = {
  ids: Set<string>;
  setIds: (ids: string[]) => void;
  toggle: (id: string) => void;
};
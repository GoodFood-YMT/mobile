import { create } from "zustand";

interface DrawerStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
}));

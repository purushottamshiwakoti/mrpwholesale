import { create } from "zustand";

export const useCategoryDialog = create((set) => ({
  isDialogOpen: false,
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
}));

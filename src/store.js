import { create } from "zustand";

export const useTestStore = create((set) => ({
  inputValue: "",
  sort: "canonical",
  setInputValue: (value) => set(() => ({ inputValue: value })),
  setSort: (value) => set(() => ({ sort: value }))
}));

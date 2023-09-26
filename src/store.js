import { create } from "zustand";

export const useTestStore = create((set) => ({
  inputValue: "",
  sort: "canonical",
  scribes: ["a", "b", "c"],
  institutes: ["bl", "ubl"],
  books: ["me", "ge", "de"],
  filters: {
    scribes: [],
    institutes: [],
    books: [],
  },
  selectedScribes: [],
  selectedInstitutes: [],
  selectedBooks: [],
  setInputValue: (value) => set(() => ({ inputValue: value })),
  setSort: (value) => set(() => ({ sort: value })),
  setScribes: (newScribes) =>
    set((state) => ({ filters: { ...state.filters, scribes: newScribes } })),
  setInstitutes: (newInstitutes) =>
    set((state) => ({
      filters: { ...state.filters, institutes: newInstitutes },
    })),
  setBooks: (newBooks) =>
    set((state) => ({ filters: { ...state.filters, books: newBooks } })),
  setSelectedScribes: (newScribes) =>
    set(() => ({ selectedScribes: newScribes })),
  setSelectedInstitutes: (newInsts) =>
    set(() => ({ selectedInstitutes: newInsts })),
  setSelectedBooks: (newBooks) => set(() => ({ selectedBooks: newBooks })),
}));

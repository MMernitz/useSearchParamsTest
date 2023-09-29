import { create } from "zustand";

export const useTestStore = create((set) => ({
  inputValue: "",
  sort: "canonical",
  scribes: [],
  institutes: [],
  books: [],
  filters: {
    scribes: [],
    institutes: [],
    books: [],
  },
  loading: true,
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
  setLoading: (newState) => set(() => ({ loading: newState })),
  setScribesData: (newScribes) => set(() => ({ scribes: newScribes })),
  setInstitutesData: (newInstitutes) =>
    set(() => ({ institutes: newInstitutes })),
  setBooksData: (newBooks) => set(() => ({ books: newBooks })),
}));

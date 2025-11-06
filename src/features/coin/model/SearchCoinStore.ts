import { create } from 'zustand';

interface SearchCoinStoreState {
  query: string;
  setQuery: (q: string) => void;
}

export const useSearchCoinStore = create<SearchCoinStoreState>(set => ({
  query: '',
  setQuery: q => set({ query: q }),
}));

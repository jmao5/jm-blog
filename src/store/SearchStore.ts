// store/searchStore.ts
import { Post } from '@/config/types';
import { create } from 'zustand';

interface SearchStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Post[];
  setSearchResults: (results: Post[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));

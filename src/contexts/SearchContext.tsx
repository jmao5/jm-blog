'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';

import { Post } from '@/config/types';

interface SearchContextType {
  postList: Post[];
  setPostList: (posts: Post[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: Post[];
  setSearchResults: (results: Post[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  return (
    <SearchContext.Provider
      value={{
        postList,
        setPostList,
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

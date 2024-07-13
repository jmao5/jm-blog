'use client';

import React, { useState } from 'react';

import { useSearchStore } from '@/store/SearchStore';
import clsx from 'clsx';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={clsx('relative mx-auto w-full max-w-xs sm:max-w-sm', isFocused && 'z-10')}>
      <input
        type='text'
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder='Search...'
        className={clsx(
          'w-32 rounded-lg border bg-gray-100 py-1.5 pl-8 pr-3 text-xs text-gray-700 sm:w-full sm:py-2 sm:text-sm',
          'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
          isFocused ? 'border-blue-500' : 'border-gray-300'
        )}
      />
      <div className='absolute inset-y-0 left-0 flex items-center pl-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3 w-3 text-gray-400 sm:h-4 sm:w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;

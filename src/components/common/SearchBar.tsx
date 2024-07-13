'use client';

import { useEffect, useState } from 'react';

import PostCard from '../post_list/PostCard';
import { Post } from '@/config/types';

interface SearchBarProps {
  postList: Post[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ postList, searchTerm, setSearchTerm }: SearchBarProps) => {
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = () => {
    const results = postList.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <>
      <div className='relative mb-4'>
        <input
          type='text'
          className='w-full rounded-lg border-2 py-2 pl-10 pr-4'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>
      {searchTerm && (
        <div className='mt-4'>
          <h2 className='mb-4 text-2xl font-bold'>검색 결과</h2>
          {searchResults.length > 0 ? (
            <ul className='grid grid-cols-1 gap-3 md:grid-cols-1 lg:gap-4'>
              {searchResults.map((post) => (
                <PostCard key={post.url + post.date} post={post} />
              ))}
            </ul>
          ) : (
            <p>조회 된 포스트가 없습니다.</p>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;

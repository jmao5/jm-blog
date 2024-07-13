'use client';

import { useState } from 'react';

import SearchBar from '../common/SearchBar';
import PostList from './PostList';
import { Post } from '@/config/types';

// ClientPostList.tsx

interface ClientPostListProps {
  postList: Post[];
}

const ClientPostList = ({ postList }: ClientPostListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <SearchBar postList={postList} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {!searchTerm && <PostList postList={postList} />}
    </>
  );
};

export default ClientPostList;

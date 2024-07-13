'use client';

import { useEffect } from 'react';

import PostCard from './PostCard';
import PostList from './PostList';
import { Post } from '@/config/types';
import { useSearchStore } from '@/store/SearchStore';

interface PostListClientProps {
  initialPostList: Post[];
}

const PostListClient = ({ initialPostList }: PostListClientProps) => {
  const { searchTerm, searchResults, setSearchResults } = useSearchStore();

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
    } else {
      const results = initialPostList.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, initialPostList, setSearchResults]);

  const postList = searchTerm ? searchResults : initialPostList;
  const isSearching = !!searchTerm;

  return (
    <>
      {isSearching ? (
        <div className='mt-4'>
          <h2 className='mb-4 text-2xl font-bold'>검색 결과</h2>
          {postList.length > 0 ? (
            <ul className='grid grid-cols-1 gap-3 md:grid-cols-1 lg:gap-4'>
              {postList.map((post) => (
                <PostCard key={post.url + post.date} post={post} />
              ))}
            </ul>
          ) : (
            <p>조회 된 포스트가 없습니다.</p>
          )}
        </div>
      ) : (
        <PostList postList={postList} />
      )}
    </>
  );
};

export default PostListClient;

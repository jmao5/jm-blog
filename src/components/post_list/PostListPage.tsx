// PostListPage.tsx
import { Suspense } from 'react';

import CategoryList from './CategoryList';
import PostListClient from './PostListClient';
import { getAllPostCount, getCategoryDetailList, getSortedPostList } from '@/lib/post';

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = await getSortedPostList(category);
  const categoryList = await getCategoryDetailList();
  const allPostCount = await getAllPostCount();

  return (
    <section className='mx-auto mt-12 w-full max-w-[950px] px-4'>
      <CategoryList
        allPostCount={allPostCount}
        categoryList={categoryList}
        currentCategory={category}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <PostListClient initialPostList={postList} />
      </Suspense>
    </section>
  );
};

export default PostListPage;

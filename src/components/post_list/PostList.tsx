// PostList.tsx
import PostCard from './PostCard';
import { Post } from '@/config/types';

interface PostListProps {
  postList: Post[];
}

const PostList = ({ postList }: PostListProps) => {
  return (
    <section className=''>
      <ul className='grid grid-cols-1 gap-3 md:grid-cols-1 lg:gap-4'>
        {postList.map((post) => (
          <PostCard key={post.url + post.date} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default PostList;

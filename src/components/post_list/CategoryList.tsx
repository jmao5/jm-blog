'use client';

import { useRouter } from 'next/navigation';

import { CategoryButton } from './CategoryButton';
import { CategoryDetail } from '@/config/types';

// 아이콘 추가

interface CategoryListProps {
  categoryList: CategoryDetail[];
  allPostCount: number;
  currentCategory?: string;
}

const CategoryList = ({
  categoryList,
  allPostCount,
  currentCategory = 'all',
}: CategoryListProps) => {
  const router = useRouter();

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'all') {
      router.push('/blog');
    } else {
      router.push(`/blog/${value}`);
    }
  };

  // 현재 선택된 카테고리의 이름을 찾는 함수
  const getCurrentCategoryName = () => {
    if (currentCategory === 'all') return 'All';
    const category = categoryList.find((cg) => cg.dirName === currentCategory);
    return category ? category.publicName : 'Select Category';
  };

  return (
    <>
      <section className='mb-10 hidden sm:block'>
        <ul className='flex gap-3'>
          <CategoryButton
            href='/blog'
            isCurrent={currentCategory === 'all'}
            displayName='All'
            count={allPostCount}
          />
          {categoryList.map((cg) => (
            <CategoryButton
              key={cg.dirName}
              href={`/blog/${cg.dirName}`}
              displayName={cg.publicName}
              isCurrent={cg.dirName === currentCategory}
              count={cg.count}
            />
          ))}
        </ul>
      </section>
      <section className='mb-6 sm:hidden'>
        <div className='relative'>
          <select
            className='select select-bordered w-40 appearance-none rounded-lg bg-white py-3 pl-4 pr-10 text-gray-700 shadow-sm focus:outline-none'
            onChange={onCategoryChange}
            value={currentCategory}
          >
            <option value='all'>All ({allPostCount})</option>
            {categoryList.map((cg) => (
              <option key={cg.dirName} value={cg.dirName}>
                {cg.publicName} ({cg.count})
              </option>
            ))}
          </select>
          <span className='absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs font-medium text-gray-500'>
            {getCurrentCategoryName()}
          </span>
        </div>
      </section>
    </>
  );
};

export default CategoryList;

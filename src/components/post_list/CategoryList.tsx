'use client';

import { useRouter } from 'next/navigation';

import { CategoryButton } from './CategoryButton';
import { CategoryDetail } from '@/config/types';
import { ChevronDown, ChevronDownIcon } from 'lucide-react';

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
        <div className='relative inline-block'>
          <select
            className='w-40 appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none'
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
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDown className='h-4 w-4' />
          </span>
          <label className='absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-500'>
            {getCurrentCategoryName()}
          </label>
        </div>
      </section>
    </>
  );
};

export default CategoryList;

'use client';

import Link from 'next/link';

import ScrollProgressBar from '@/components/common/ScrollProgressBar';
import SearchBar from '@/components/common/SearchBar';
import { useSpyElem } from '@/hook/useSpy';
import ThemeSwitch from '@/layouts/theme/Switch';

export const Header = () => {
  const { ref, marginTop } = useSpyElem(65);

  return (
    <nav
      style={{ marginTop }}
      ref={ref}
      className='fixed z-40 flex w-full flex-col items-center justify-center border-b bg-background shadow-sm'
    >
      <div className='mt-1 flex h-[52px] w-full max-w-[1200px] items-center justify-between px-4 lg:h-[64px]'>
        <div className='flex items-center text-lg font-medium'>
          <Link href='/blog'>JMLOG</Link>
        </div>
        <div className='flex items-center gap-1 lg:gap-3'>
          <SearchBar />
          <ThemeSwitch />
        </div>
      </div>
      <ScrollProgressBar />
    </nav>
  );
};

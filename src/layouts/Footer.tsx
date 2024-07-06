import Link from 'next/link';

import IconGithub from '@/components/icon/Github';
import IconLinkedin from '@/components/icon/LinkedIn';

export const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-center gap-4 pb-16 pt-20 text-center'>
      <div className='flex justify-center gap-4'>
        <Link href='https://github.com/jmao5' target='_blank'>
          <IconGithub
            className='fill-foreground transition hover:fill-pink-600'
            height={30}
            width={30}
          />
        </Link>
        {/* <Link href='https://www.linkedin.com/in/dohkim777' target='_blank'>
          <IconLinkedin
            className='fill-foreground transition hover:fill-pink-600'
            height={30}
            width={30}
          />
        </Link> */}
      </div>
      <a href='https://hits.sh/jmlog.vercel.app/blog/'>
        <img
          alt='Hits'
          src='https://hits.sh/jmlog.vercel.app/blog.svg?view=today-total&label=visitors'
        />
      </a>
      <div>
        © 2024. <span className='font-semibold'>SangHyeon Jeon</span> all rights reserved.
      </div>
    </footer>
  );
};

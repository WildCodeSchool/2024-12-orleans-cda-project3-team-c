import { useLoaderData, useNavigate } from 'react-router-dom';

import type { FeedPost } from '@app/api';

import Post from '@/components/post';

import backIcon from '../assets/icons/arrow-left-white.svg';

export default function SinglePostPage() {
  const post = useLoaderData<FeedPost>();
  const navigate = useNavigate();

  return (
    <section className='min-h-screen w-full'>
      <div className='mx-auto max-w-[460px] pb-16 md:pt-8'>
        <header className='p-4'>
          <button
            type='button'
            className='font-title relative block h-8 w-full text-center text-base md:text-2xl'
            onClick={async () => {
              await navigate(-1);
            }}
          >
            <img
              src={backIcon}
              aria-hidden='true'
              alt=''
              className='absolute top-0 left-0 w-8'
            />
            {'Post'}
          </button>
        </header>
        <Post key={post.id} post={post} />
      </div>
    </section>
  );
}

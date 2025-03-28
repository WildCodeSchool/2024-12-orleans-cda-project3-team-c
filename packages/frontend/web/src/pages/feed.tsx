import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import EphemeralStatusSlider from '@/components/ephemeral-status-slider';
import Post from '@/components/post';

import bell from '../assets/icons/bell-white.svg';
import type PostType from '../posts-mock';

export default function Feed() {
  const loaderData = useLoaderData<typeof PostType>();
  const [posts, setPosts] = useState(loaderData);

  return (
    <section id='feed-section'>
      <header
        id='feed-header'
        className='flex items-center justify-between p-4'
      >
        <h1 className='font-title text-[32px] font-black'>{'Mingo'}</h1>
        <Link to={'/notifications'}>
          <img src={bell} alt='' className='w-8' />
        </Link>
      </header>

      <EphemeralStatusSlider />

      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </section>
  );
}

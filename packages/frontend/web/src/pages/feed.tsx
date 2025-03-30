import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import EphemeralStatusSlider from '@/components/ephemeral-status-slider';
import Post from '@/components/post';

import bellIcon from '../assets/icons/bell-white.svg';
import type { PostType } from '../posts-mock';

export default function Feed() {
  const loaderData = useLoaderData<PostType[]>();
  const [posts, setPosts] = useState(loaderData);

  const likePost = (postId: number): void => {
    // *gérer la partie backend*
    setPosts((currentPosts): PostType[] => {
      const postToUpdate = currentPosts.find((post) => (post.id = postId));
      if (postToUpdate) {
        postToUpdate.isLiked = !postToUpdate.isLiked;
        postToUpdate.likes += postToUpdate.isLiked ? 1 : -1;
      }
      return [...currentPosts];
    });
  };

  return (
    <section id='feed-section' className='max-w-[460px]'>
      <header
        id='feed-header'
        className='flex items-center justify-between p-4'
      >
        <h1 className='font-title text-[32px] font-black'>{'Mingo'}</h1>
        <Link to={'/notifications'}>
          <img src={bellIcon} alt='' className='w-8' />
        </Link>
      </header>

      <EphemeralStatusSlider />

      {posts.map((post) => {
        return <Post post={post} key={post.id} likePost={likePost} />;
      })}
    </section>
  );
}

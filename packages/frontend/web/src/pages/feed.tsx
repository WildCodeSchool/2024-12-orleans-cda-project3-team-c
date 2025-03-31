import { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import Post from '@/components/post';

import bellIcon from '../assets/icons/bell-white.svg';
import newPostsMock from '../new-posts-mock';
import type { PostType } from '../posts-mock';

export default function Feed() {
  const loaderData = useLoaderData<PostType[]>();
  const [posts, setPosts] = useState(loaderData);
  const infiniteScrollTrigger = useRef(null);

  useEffect(() => {
    if (infiniteScrollTrigger.current) {
      new IntersectionObserver(observeInfiniteScroll).observe(
        infiniteScrollTrigger.current,
      );
    }
  }, [infiniteScrollTrigger]);

  function fetchNewPosts() {
    // fetching posts goes here
    setPosts((currentPosts: PostType[]): PostType[] => {
      const newPosts = [...currentPosts, ...newPostsMock];
      return newPosts;
    });
  }

  function observeInfiniteScroll(observers: IntersectionObserverEntry[]) {
    if (observers[0].isIntersecting) {
      fetchNewPosts();
    }
  }

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

      {posts.map((post) => {
        return <Post originPost={post} key={post.id} />;
      })}
      <div className='h-1 bg-amber-400' ref={infiniteScrollTrigger} />
    </section>
  );
}

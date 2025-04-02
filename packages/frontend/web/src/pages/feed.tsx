import { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import type { FeedPost } from '@app/api';

import postApiConnection from '@/api-connection/post-api-connection';
import Post from '@/components/post';

import bellIcon from '../assets/icons/bell-white.svg';

export default function Feed() {
  const loaderData = useLoaderData<FeedPost[]>();
  const [posts, setPosts] = useState(loaderData);
  const infiniteScrollTrigger = useRef(null);
  let page = 1;

  useEffect(() => {
    if (infiniteScrollTrigger.current) {
      new IntersectionObserver(observeInfiniteScroll).observe(
        infiniteScrollTrigger.current,
      );
    }
  }, [infiniteScrollTrigger]);

  async function fetchNewPosts() {
    page++;
    const newPosts = await postApiConnection.getPage(page);

    setPosts((currentPosts) => {
      return [...currentPosts, ...newPosts];
    });
  }

  async function observeInfiniteScroll(observers: IntersectionObserverEntry[]) {
    if (observers[0].isIntersecting) {
      await fetchNewPosts();
    }
  }

  return (
    <section id='feed-section' className='mx-auto max-w-[460px]'>
      <header
        id='feed-header'
        className='flex items-center justify-between p-4'
      >
        <h1 className='font-title text-3xl font-black'>{'Mingo'}</h1>
        <Link to={'/notifications'}>
          <img src={bellIcon} alt='' className='w-8' />
        </Link>
      </header>

      {posts.map((post: FeedPost) => {
        return <Post post={post} key={post.id} />;
      })}
      {/* enlever la hauteur et la couleur, rajouter un offset */}
      {/* à garder comme ça le temps de terminer toutes les fonctionnalités liées à ça */}
      <div className='h-1 bg-amber-400' ref={infiniteScrollTrigger} />
    </section>
  );
}

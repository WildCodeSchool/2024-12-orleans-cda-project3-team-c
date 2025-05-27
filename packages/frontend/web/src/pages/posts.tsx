import { useEffect, useRef, useState } from 'react';
import {
  Route,
  Router,
  useLoaderData,
  useLocation,
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from 'react-router-dom';

import type { FeedPost } from '@app/api';

import postApiConnection from '@/api-connection/post-api-connection';
import userApiConnection from '@/api-connection/user-api-connection';
import Post from '@/components/post';

import backIcon from '../assets/icons/arrow-left-white.svg';

export default function Posts() {
  const loaderData = useLoaderData<FeedPost[]>();
  const [posts, setPosts] = useState(loaderData);
  const infiniteScrollTrigger = useRef(null);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const username = path.split('/')[2];
  console.log(posts);

  let page = 1;

  useEffect(() => {
    let infiniteScrollObserver: IntersectionObserver;
    if (infiniteScrollTrigger.current) {
      infiniteScrollObserver = new IntersectionObserver(observeInfiniteScroll);
      infiniteScrollObserver.observe(infiniteScrollTrigger.current);
    }

    return () => {
      if (infiniteScrollTrigger.current) {
        infiniteScrollObserver.unobserve(infiniteScrollTrigger.current);
      }
    };
  }, [infiniteScrollTrigger]);

  async function fetchNewPosts() {
    page++;
    const newPosts = await userApiConnection.getUserFeedPage(username, page);

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
    <section className='min-h-screen w-full border border-red-500'>
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
            {'Posts'}
          </button>
        </header>
        {posts.map((post: FeedPost) => {
          return <Post post={post} key={post.id} />;
        })}
        <div ref={infiniteScrollTrigger} />
      </div>
    </section>
  );
}

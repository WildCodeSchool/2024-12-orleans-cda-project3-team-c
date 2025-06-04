import { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import type { FeedPost } from '@app/api';

import postApiConnection from '@/api-connection/post-api-connection';
import Post from '@/components/post';
import UserSuggestionContainer from '@/components/user-suggestion';
import { useNotificationContext } from '@/contexts/notification-context';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';

import bellIcon from '../assets/icons/bell-white.svg';

export default function Feed() {
  const loaderData = useLoaderData<FeedPost[]>();
  const [posts, setPosts] = useState(loaderData);
  const infiniteScrollTrigger = useRef(null);
  const notificationContext = useNotificationContext();

  useInfiniteScroll(infiniteScrollTrigger, observeInfiniteScroll);

  let page = 1;

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

  const showNotifications = () => {
    if (notificationContext?.setAreNotificationsVisible !== undefined) {
      notificationContext.setAreNotificationsVisible(true);
    }
  };

  return (
    // feed section
    <section className='flex'>
      <div className='mx-auto max-w-[460px] pb-16 md:pt-8'>
        <header
          id='feed-header'
          className='flex items-center justify-between px-2 pt-2 pb-8 md:hidden md:p-4'
        >
          <h1 className='font-title text-3xl font-black'>{'Mingo'}</h1>
          <button
            type='button'
            title='Show notifications'
            aria-label='Show notifications'
            onClick={showNotifications}
          >
            <img src={bellIcon} alt='' className='w-8' aria-hidden />
          </button>
        </header>
        <UserSuggestionContainer className='mx-auto flex flex-col px-2 lg:hidden' />

        {posts.map((post: FeedPost) => {
          return <Post post={post} key={post.id} />;
        })}
        <div ref={infiniteScrollTrigger} />
      </div>
      <aside>
        <UserSuggestionContainer className='mt-40 mr-8 hidden w-[298px] md:hidden lg:flex lg:flex-col' />
      </aside>
    </section>
  );
}

import { useRef, useState } from 'react';

import type { PostLikeItem } from '@app/api';

import postLikeApiConnection from '@/api-connection/post-like-api-connection';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';

import backIcon from '../assets/icons/arrow-left-white.svg';
import PostLikesLikeItem from './post-likes-like-item';

export default function PostLikes({
  displayLikesModal,
  postId,
}: {
  readonly displayLikesModal: (isVisible: boolean) => void;
  readonly postId: number;
}) {
  const [likes, setLikes] = useState<PostLikeItem[]>([]);
  const infiniteScrollTrigger = useRef(null);

  useInfiniteScroll(infiniteScrollTrigger, observeInfiniteScroll);

  let page = 0;

  async function getLikes() {
    const newLikes = await postLikeApiConnection.getPostLikes(postId, page);

    setLikes((currentLikes) => {
      return [...currentLikes, ...newLikes];
    });
  }

  async function observeInfiniteScroll(observers: IntersectionObserverEntry[]) {
    if (observers[0].isIntersecting) {
      page++;
      await getLikes();
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center md:bg-black/75'>
      <section className='fixed bottom-0 left-0 z-10 h-dvh w-full overflow-y-auto bg-purple-950 md:relative md:mr-0 md:mb-0 md:ml-[224px] md:h-[685px] md:w-[400px] md:overflow-y-scroll lg:mr-[106px] lg:ml-0'>
        <header className='p-4'>
          <button
            type='button'
            className='font-title relative block h-8 w-full text-center text-base md:text-2xl'
            onClick={() => {
              displayLikesModal(false);
            }}
          >
            <img
              src={backIcon}
              aria-hidden='true'
              alt=''
              className='absolute top-0 left-0 w-8'
            />
            {'Likes'}
          </button>
        </header>
        <ul className='px-4 pb-4'>
          {likes.map((like) => {
            return <PostLikesLikeItem key={like.id} like={like} />;
          })}
        </ul>
        <div ref={infiniteScrollTrigger} />
      </section>
    </div>
  );
}

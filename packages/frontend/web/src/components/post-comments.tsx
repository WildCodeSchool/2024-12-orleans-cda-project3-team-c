import { useEffect, useRef, useState } from 'react';

import type { PostComment } from '@app/api';

import commentApiConnection from '@/api-connection/comment-api-connection';

import backIcon from '../assets/icons/arrow-left-white.svg';
import Comment from './comment';

export default function PostComments({
  displayCommentsModal,
  postId,
}: {
  readonly displayCommentsModal: (isVisible: boolean) => void;
  readonly postId: number;
}) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const infiniteScrollTrigger = useRef(null);
  let page = 1;

  useEffect(() => {
    console.log('1', page);
    const controller = new AbortController();
    const signal = controller.signal;

    (async function getComments() {
      const newComments = await commentApiConnection.getPostComments(
        postId,
        signal,
        page,
      );
      console.log(newComments);

      setComments((currentComments) => {
        return [...currentComments, ...newComments];
      });
    })();
    return () => {
      controller.abort();
    };
  }, [page]);

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

  function observeInfiniteScroll(observers: IntersectionObserverEntry[]) {
    if (observers[0].isIntersecting) {
      page++;
      console.log('trigger !');
      // await fetchNewPosts();
    }
  }

  return (
    <section
      className={`fixed bottom-0 left-0 z-10 h-dvh h-screen w-dvw bg-purple-950`}
    >
      <header className='mb-4 p-4'>
        <button
          type='button'
          className='font-title relative block h-8 w-full text-center text-base md:text-2xl'
          onClick={() => {
            displayCommentsModal(false);
          }}
        >
          <img
            src={backIcon}
            aria-hidden='true'
            alt=''
            className='absolute top-0 left-0 w-8'
          />
          {'Comments'}
        </button>
      </header>
      <div className='px-4 pb-4'>
        <div className='border-danger h-80 overflow-y-auto border'>
          {comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
          <div ref={infiniteScrollTrigger} className='h-2 bg-green-500' />
        </div>
        <div className='user-input-section'>
          <form>
            <label htmlFor='text' className='hidden'>
              {'Your comment'}
            </label>
            <div>
              <textarea name='text' id='text' placeholder='' />
              <button type='submit' />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';

import type { PostComment } from '@app/api';

import commentApiConnection from '@/api-connection/comment-api-connection';
import postCommentApiConnection from '@/api-connection/post-comment-api-connection';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';

import backIcon from '../assets/icons/arrow-left-white.svg';
import sendIcon from '../assets/icons/send-white.svg';
import Comment from './comment';

export default function PostComments({
  displayCommentsModal,
  postId,
}: {
  readonly displayCommentsModal: (isVisible: boolean) => void;
  readonly postId: number;
}) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const infiniteScrollTrigger = useRef(null);

  useInfiniteScroll(infiniteScrollTrigger, observeInfiniteScroll);

  let page = 0;

  async function getComments() {
    const newComments = await commentApiConnection.getPostComments(
      postId,
      page,
    );

    setComments((currentComments) => {
      return [...currentComments, ...newComments];
    });
  }

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }
      await handleSubmitCommentForm();
    }
  };

  const handleSubmitCommentForm = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (commentText === '') {
      setErrorMessage('Your comment cannot be empty');
      return;
    }

    const response = await postCommentApiConnection.postComment(
      postId,
      commentText,
    );
    if (response.ok && response.comment !== undefined) {
      // @ts-expect-error "ts fail to correctly type response"
      setComments((currentComments) => {
        return [...currentComments, response.comment];
      });
      setCommentText('');
    } else if (response.message) {
      setErrorMessage(response.message);
    }
  };

  async function observeInfiniteScroll(observers: IntersectionObserverEntry[]) {
    if (observers[0].isIntersecting) {
      page++;
      await getComments();
    }
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center md:bg-black/75'
      onClick={() => {
        displayCommentsModal(false);
      }}
    >
      <section
        className='relative z-10 h-full max-h-dvh w-full overflow-y-auto bg-purple-950 md:mr-0 md:mb-0 md:ml-[224px] md:h-fit md:w-[400px] lg:mr-[106px] lg:ml-0'
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <header className='p-4'>
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
          <div className='h-[calc(95dvh_-_116px)] overflow-y-auto md:h-[550px]'>
            {comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
            <div ref={infiniteScrollTrigger} />
          </div>
          <div className='h-fit'>
            <p className='text-danger text-center text-xs'>{errorMessage}</p>
            <form onSubmit={handleSubmitCommentForm}>
              <label htmlFor='text' className='hidden'>
                {'Your comment'}
              </label>
              <div className='relative'>
                <textarea
                  name='text'
                  id='text'
                  placeholder='Write a comment'
                  className='w-full resize-none rounded border border-white bg-purple-900 p-2 text-xs'
                  value={commentText}
                  onChange={(event) => {
                    setCommentText(event.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type='submit'
                  aria-label='Send'
                  title='Send'
                  className='absolute top-[50%] right-0 flex -translate-y-1/2 justify-center p-2'
                >
                  <img src={sendIcon} aria-hidden alt='' className='w-4' />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

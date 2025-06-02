import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import type { PostPreview } from '@app/api';

import userApiConnection from '@/api-connection/user-api-connection';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';

type UserProfilesPostsProps = {
  readonly basePosts: PostPreview[];
  readonly userId: number;
  readonly username: string;
};

export default function UserProfilesPosts({
  basePosts,
  userId,
  username,
}: UserProfilesPostsProps) {
  const [previews, setPreviews] = useState(basePosts);
  const infiniteScrollTrigger = useRef(null);
  useInfiniteScroll(infiniteScrollTrigger, observeInfiniteScroll);

  let page = 1;

  async function fetchNewPosts() {
    page++;
    const newPreviews = await userApiConnection.getUserPreviewsPage(
      userId,
      page,
    );

    setPreviews((currentPreviews) => {
      return [...currentPreviews, ...newPreviews];
    });
  }

  async function observeInfiniteScroll(observers: IntersectionObserverEntry[]) {
    if (observers[0].isIntersecting) {
      await fetchNewPosts();
    }
  }

  if (!basePosts || basePosts.length === 0) {
    return <div className='py-8 text-center text-white'>{'No post yet.'}</div>;
  }

  return (
    <section className='grid h-82 grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'>
      {previews.map((preview) => (
        <div key={preview.id}>
          <Link to={`/posts/${username}#${preview.id}`}>
            <img
              className='size-40 sm:size-56 md:size-81'
              src={
                preview.picture
                  ? `/cdn/pictures/posts/${preview.picture}`
                  : '/user-mock.png'
              }
              alt={`Post ${preview.id}`}
            />
          </Link>
        </div>
      ))}
      <div ref={infiniteScrollTrigger} />
    </section>
  );
}

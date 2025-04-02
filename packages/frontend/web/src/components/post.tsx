import { Link } from 'react-router-dom';

import type { FeedPost } from '@app/api';

import { getDescriptionElements, getTimeAgo } from '@/utils/text-formating';

import commentIcon from '../assets/icons/comment-white.svg';
import likedIcon from '../assets/icons/flame-pink.svg';
import likeIcon from '../assets/icons/flame-white.svg';

const cdnUrl = import.meta.env.VITE_CDN_URL;

export default function Post({ post }: { readonly post: FeedPost }) {
  const timeAgo = getTimeAgo(post.created_at);
  const descriptionElements = post.description
    ? getDescriptionElements(post.description)
    : [];

  // tsx **************************************************
  return (
    <article className='mb-8'>
      <header className='flex items-center justify-between p-2'>
        <Link
          to={`/profile/${post.author?.username}`}
          className='flex items-center gap-4'
          title={`See ${post.author?.username}'s profile`}
        >
          <div className='w-8 overflow-hidden rounded'>
            <img
              src={`${cdnUrl}/pictures/users/${post.author?.profile_picture}`}
              alt={`${post.author?.username} profile picture`}
            />
          </div>
          <h2 className='text-[14px} font-title'>
            {'@'}
            {post.author?.username}
          </h2>
        </Link>
        {!post.author?.isFollowing && (
          <button
            title={`Follow ${post.author?.username}`}
            type='button'
            className='border-turquoise-blue-400 text-turquoise-blue-400 text-title rounded border px-2 py-0.5 text-xs'
          >
            {'Follow'}
          </button>
        )}
      </header>

      <div className='slideshow-container mb-1'>
        <div className='slide'>
          <img src={`${cdnUrl}/pictures/posts/${post.picture}`} alt='' />
        </div>
      </div>

      <div className='post-content p-2'>
        <div className='post-action-container flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <button
              type='button'
              aria-label={`${post.isLiked ? 'Like' : 'Unlike'} this post`}
              title={`${post.isLiked ? 'Like' : 'Unlike'} this post`}
              className='like-btn'
            >
              <img
                src={post.isLiked ? likedIcon : likeIcon}
                alt=''
                className='w-8'
                aria-hidden='true'
              />
            </button>
            <p className='text-title text-xs'>
              {!!post.likeCount ? post.likeCount : ''}
            </p>
          </div>
          <button
            type='button'
            className='comment-btn flex items-center gap-1'
            aria-label='Comments'
            title='Comments'
          >
            <img src={commentIcon} alt='' className='w-8' aria-hidden='true' />
            <span className='text-title text-xs'>{post.commentCount}</span>
          </button>
        </div>

        <p className='post-description mb-1 text-[14px] whitespace-pre-wrap'>
          <span className='font-title'>
            {'@'}
            {post.author?.username}
          </span>{' '}
          {...descriptionElements}
        </p>
        <p className='post-date text-placeholder text-[10px]'>{timeAgo}</p>
      </div>
    </article>
  );
}

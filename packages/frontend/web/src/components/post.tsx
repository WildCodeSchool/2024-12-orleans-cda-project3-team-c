import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { PostType } from '@/posts-mock';
import { getDescriptionElements, getTimeAgo } from '@/utils/text-formating';

import commentIcon from '../assets/icons/comment-white.svg';
import likedIcon from '../assets/icons/flame-pink.svg';
import likeIcon from '../assets/icons/flame-white.svg';

export default function Post({
  originPost,
}: {
  readonly originPost: PostType;
}) {
  const [post, setPost] = useState(originPost);
  const timeAgo = getTimeAgo(post.created_at);
  const descriptionElements = getDescriptionElements(post.description);

  const likePost = () => {
    // doing some backend things
    // if backend things go good:
    setPost((currentPostValue): PostType => {
      currentPostValue.isLiked = !currentPostValue.isLiked;
      currentPostValue.likes += currentPostValue.isLiked ? 1 : -1;
      return { ...currentPostValue };
    });
  };

  // jsx
  return (
    <article className='mb-8'>
      <header className='flex items-center justify-between p-2'>
        <Link
          to={`/profile/${post.author.username}`}
          className='flex items-center gap-4'
          title={`See ${post.author.username}'s profile`}
        >
          <div className='w-8 overflow-hidden rounded'>
            <img
              src={`/pictures/users/${post.author.profile_picture}`}
              alt={`${post.author.username} profile picture`}
            />
          </div>
          <h2 className='text-[14px} font-title'>
            {'@'}
            {post.author.username}
          </h2>
        </Link>
        {!!post.author.isFollowed && (
          <button
            title={`Follow ${post.author.username}`}
            type='button'
            className='border-turquoise-blue-400 text-turquoise-blue-400 text-title rounded border px-2 py-[2px] text-[12px]'
          >
            {'Follow'}
          </button>
        )}
      </header>

      <div className='slideshow-container mb-1'>
        <div className='slide'>
          <img src={`/pictures/posts/${post.picture}`} alt='' />
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
              onClick={likePost}
            >
              <img
                src={post.isLiked ? likedIcon : likeIcon}
                alt=''
                className='w-8'
                aria-hidden='true'
              />
            </button>
            <p className='text-title text-[12px]'>
              {post.likes ? post.likes : null}
            </p>
          </div>
          <button
            type='button'
            className='comment-btn flex items-center gap-1'
            aria-label='Comments'
            title='Comments'
          >
            <img src={commentIcon} alt='' className='w-8' aria-hidden='true' />
            <span className='text-title text-[12px]'>
              {post.comments.length}
            </span>
          </button>
        </div>

        <p className='post-description mb-1 text-[14px] whitespace-pre-wrap'>
          <span className='font-title'>
            {'@'}
            {post.author.username}
          </span>{' '}
          {...descriptionElements}
        </p>
        <p className='post-date text-placeholder text-[10px]'>{timeAgo}</p>
      </div>
    </article>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { FeedPost, PostLike } from '@app/api';

import postLikeApiConnection from '@/api-connection/post-like-api-connection';
import { getDescriptionElements, getTimeAgo } from '@/utils/text-formating';

import commentIcon from '../assets/icons/comment-white.svg';
import likedIcon from '../assets/icons/flame-pink.svg';
import likeIcon from '../assets/icons/flame-white.svg';

const cdnUrl = import.meta.env.VITE_CDN_URL;

export default function Post({ post }: { readonly post: FeedPost }) {
  const timeAgo = getTimeAgo(post.created_at);
  const descriptionElements = !!post.description
    ? getDescriptionElements(post.description)
    : [];
  const [postLike, setPostLike] = useState({
    isLiked: !!post.isLiked,
    likeCount: post.likeCount,
  });

  const togglePostLike = async () => {
    // Vérifier l'atat de postIsLiked
    let newState: PostLike;
    if (postLike.isLiked) {
      newState = await postLikeApiConnection.unlikePost(post.id);
    } else {
      newState = await postLikeApiConnection.likePost(post.id);
    }
    if (newState) {
      setPostLike({
        isLiked: newState.isLiked,
        likeCount: newState.likeCount ?? 0,
      });
    }
  };

  // tsx **************************************************
  return (
    <article className='mb-8'>
      <header className='flex items-center justify-between p-2'>
        <Link
          to={`/other-profile/${post.author?.username}`}
          className='flex items-center gap-4'
          title={`See ${post.author?.username}'s profile`}
        >
          <div className='w-8 overflow-hidden rounded'>
            <img
              src={`${cdnUrl}/pictures/users/${post.author?.profile_picture}`}
              alt={`${post.author?.username} profile picture`}
            />
          </div>
          <h2 className='font-title text-sm md:text-base'>
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

      {/* slideshow container */}
      <div className='mb-1'>
        <div className='slide'>
          <img src={`${cdnUrl}/pictures/posts/${post.picture}`} alt='' />
        </div>
      </div>

      {/* post content */}
      <div className='p-2'>
        <div className='post-action-container flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            {/* like btn */}
            <button
              type='button'
              aria-label={`${postLike.isLiked ? 'Like' : 'Unlike'} this post`}
              title={`${postLike.isLiked ? 'Like' : 'Unlike'} this post`}
              onClick={togglePostLike}
            >
              <img
                src={postLike.isLiked ? likedIcon : likeIcon}
                alt=''
                className='w-8'
                aria-hidden='true'
              />
            </button>
            <p className='text-title text-xs'>
              {!!postLike.likeCount ? postLike.likeCount : ''}
            </p>
          </div>

          {/* comment btn */}
          <button
            type='button'
            className='flex items-center gap-1'
            aria-label='Comments'
            title='Comments'
          >
            <img src={commentIcon} alt='' className='w-8' aria-hidden='true' />
            <span className='text-title text-xs'>{post.commentCount}</span>
          </button>
        </div>

        {/* post description */}
        <p className='mb-1 text-sm whitespace-pre-wrap md:text-base'>
          <span className='font-title'>
            {'@'}
            {post.author?.username}
          </span>{' '}
          {...descriptionElements}
        </p>
        {/* post date */}
        <p className='text-placeholder text-[10px]'>{timeAgo}</p>
      </div>
    </article>
  );
}

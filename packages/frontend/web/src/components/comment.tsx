import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { PostComment } from '@app/api';

import commentLikeApiConnection from '@/api-connection/comment-like-api-connection';
import { getDescriptionElements, getTimeAgo } from '@/utils/text-formating';

import likedIcon from '../assets/icons/flame-pink.svg';
import likeIcon from '../assets/icons/flame-white.svg';

export default function Comment({
  comment,
}: {
  readonly comment: PostComment;
}) {
  const timeAgo = getTimeAgo(comment.created_at);
  const commentElements = getDescriptionElements(comment.text);
  const [commentLike, setCommentLike] = useState({
    isLiked: !!comment.isLiked,
    likeCount: comment.likeCount,
  });

  const toggleCommentLike = async () => {
    let newState;
    if (commentLike.isLiked) {
      newState = await commentLikeApiConnection.unlikeComment(comment.id);
    } else {
      newState = await commentLikeApiConnection.likeComment(comment.id);
    }

    if (newState) {
      setCommentLike({
        isLiked: newState.isLiked,
        likeCount: newState.likeCount ?? 0,
      });
    }
  };

  return (
    <article className='border-b-placeholder mb-4 border-b pb-4'>
      <header className='mb-1 flex items-center gap-2'>
        <Link
          to={`/profile/${comment.author.username}`}
          title={`Visit ${comment.author.username}'s profile`}
          className='flex items-center gap-1'
        >
          <div className='w-8 overflow-hidden rounded'>
            <img
              src={`/cdn/pictures/users/${comment.author.profile_picture}`}
              alt={`${comment.author.username} profile picture`}
            />
          </div>
          <h2 className='font-title text-sm md:text-base'>
            {'@'}
            {comment.author.username}
          </h2>
        </Link>
        <p className='text-placeholder mt-1 text-[10px]'>{timeAgo}</p>
      </header>
      <div className='ml-auto flex items-start'>
        <p className='ml-5 w-full text-sm'>{...commentElements}</p>
        <div className='like-container'>
          <div className='flex items-center gap-1'>
            {/* like btn */}
            <button
              type='button'
              aria-label={`${commentLike.isLiked ? 'Like' : 'Unlike'} this post`}
              title={`${commentLike.isLiked ? 'Like' : 'Unlike'} this post`}
              onClick={toggleCommentLike}
              className='w-4'
            >
              <img
                src={commentLike.isLiked ? likedIcon : likeIcon}
                alt=''
                className='w-8'
                aria-hidden='true'
              />
            </button>
            <p className='text-title text-xs'>
              {!!commentLike.likeCount ? commentLike.likeCount : ''}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

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
    <article>
      <header>
        <Link
          to={`/profile/${comment.author.username}`}
          title={`Visit ${comment.author.username}'s profile`}
        >
          <div className='w-4 overflow-hidden rounded'>
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
        <p className='text-placeholder text-[10px]'>{timeAgo}</p>
      </header>
      <div>
        <p>{...commentElements}</p>
        <div className='like-container'>
          <div className='flex items-center gap-1'>
            {/* like btn */}
            <button
              type='button'
              aria-label={`${commentLike.isLiked ? 'Like' : 'Unlike'} this post`}
              title={`${commentLike.isLiked ? 'Like' : 'Unlike'} this post`}
              onClick={toggleCommentLike}
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

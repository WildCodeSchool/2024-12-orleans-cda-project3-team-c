import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import type { FeedPost, PostLike } from '@app/api';

import followUpApiConnection from '@/api-connection/follow-up-api-connection';
import postLikeApiConnection from '@/api-connection/post-like-api-connection';
import { getDescriptionElements, getTimeAgo } from '@/utils/text-formating';

import commentIcon from '../assets/icons/comment-white.svg';
import likedIcon from '../assets/icons/flame-pink.svg';
import likeIcon from '../assets/icons/flame-white.svg';
import BodyPortal from './body-portal';
import FollowButton from './follow-suggestion-button';
import PostComments from './post-comments';

export default function Post({ post }: { readonly post: FeedPost }) {
  const timeAgo = getTimeAgo(post.created_at);
  const descriptionElements = !!post.description
    ? getDescriptionElements(post.description)
    : [];
  const [postLike, setPostLike] = useState({
    isLiked: !!post.isLiked,
    likeCount: post.likeCount,
  });
  const [isFollowing, setIsFollowing] = useState(!!post.author.isFollowing);
  const [areCommentsVisible, setAreCommentsVisible] = useState(false);

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

  const handleFollowClick = async () => {
    let newState;
    if (isFollowing) {
      newState = await followUpApiConnection.unfollowUser(post.author.id);
    } else {
      newState = await followUpApiConnection.followUser(post.author.id);
    }
    if (newState !== null) {
      setIsFollowing(newState.isFollowing);
    }
  };

  const displayCommentsModal = (isVisible: boolean) => {
    setAreCommentsVisible(isVisible);
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // tsx **************************************************
  return (
    <>
      <article className='mb-8'>
        <header className='flex items-center justify-between p-2'>
          <Link
            to={`/profile/${post.author.username}`}
            className='flex items-center gap-4'
            title={`Visit ${post.author?.username}'s profile`}
          >
            <div className='w-8 overflow-hidden rounded'>
              <img
                src={`/cdn/pictures/users/${post.author.profile_picture}`}
                alt={`${post.author.username} profile picture`}
              />
            </div>
            <h2 className='font-title text-sm md:text-base'>
              {'@'}
              {post.author.username}
            </h2>
          </Link>
          {!post.author.isFollowing && (
            <FollowButton
              isFollowing={isFollowing}
              username={post.author.username}
              handleFollowClick={handleFollowClick}
            />
          )}
        </header>

        {/* slideshow container */}
        <div className='mb-1'>
          <div className='slide'>
            <img src={`/cdn/pictures/posts/${post.picture}`} alt='' />
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
              title="See post's comments"
              onClick={() => {
                displayCommentsModal(true);
              }}
            >
              <img
                src={commentIcon}
                alt=''
                className='w-8'
                aria-hidden='true'
              />
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
      {areCommentsVisible ? (
        <BodyPortal>
          <PostComments
            displayCommentsModal={displayCommentsModal}
            postId={post.id}
          />
        </BodyPortal>
      ) : null}
    </>
  );
}

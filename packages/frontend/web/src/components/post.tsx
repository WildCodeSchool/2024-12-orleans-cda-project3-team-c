import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { FeedPost, PostLike } from '@app/api';

import followUpApiConnection from '@/api-connection/follow-up-api-connection';
import postApiConnection from '@/api-connection/post-api-connection';
import postLikeApiConnection from '@/api-connection/post-like-api-connection';
import { useLoginContext } from '@/contexts/auth-context';
import { getDescriptionElements, getTimeAgo } from '@/utils/text-formating';

import certificationIcon from '../assets/icons/certification-pink.png';
import commentIcon from '../assets/icons/comment-white.svg';
import likedIcon from '../assets/icons/flame-pink.svg';
import likeIcon from '../assets/icons/flame-white.svg';
import optionsIcon from '../assets/icons/menu-dots-white.svg';
import warningIcon from '../assets/icons/warning-red.svg';
import BodyPortal from './body-portal';
import FollowButton from './follow-suggestion-button';
import PostComments from './post-comments';
import PostLikes from './post-likes';

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
  const [areLikesVisible, setAreLikesVisible] = useState(false);
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSetDeleteErrorMessage, setIsSetDeleteErrorMessage] = useState(false);
  const [isSetDeleteSuccessMessage, setIsSetDeleteSuccessMessage] =
    useState(false);

  document.body.style.overflow = 'auto';

  const context = useLoginContext();
  const user = context?.user;

  const togglePostLike = async () => {
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

  const displayLikesModal = (isVisible: boolean) => {
    setAreLikesVisible(isVisible);
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleClickOptionsButton = () => {
    setAreOptionsVisible(true);
  };

  const handleClickOptionsOverlay = () => {
    setAreOptionsVisible(false);
    setIsDeleteModalVisible(false);
    setIsSetDeleteSuccessMessage(false);
  };

  const handleClickConfirmDelete = async () => {
    setIsSetDeleteErrorMessage(false);
    const response = await postApiConnection.delete(post.id);
    if (response.ok) {
      setIsDeleteModalVisible(false);
      setIsSetDeleteSuccessMessage(true);
    } else {
      setIsSetDeleteErrorMessage(true);
    }
  };

  // tsx **************************************************
  return (
    <>
      <article className='mb-8' id={post.id}>
        <header className='relative flex items-center justify-between p-2'>
          <Link
            to={`/profile/${post.author.username}`}
            className='flex items-center gap-4'
            title={`Visit ${post.author?.username}'s profile`}
          >
            <div className='size-8 overflow-hidden rounded'>
              <img
                src={`/cdn/pictures/users/${post.author.profile_picture}`}
                alt={`${post.author.username} profile picture`}
              />
            </div>
            <h2 className='font-title flex gap-1 text-sm md:text-base'>
              {'@'}
              {post.author.username}
              {post.author.status === 'certified' ? (
                <img
                  src={certificationIcon}
                  alt='certification'
                  className='size-3 md:size-4'
                />
              ) : null}
            </h2>
          </Link>

          {!post.author.isFollowing && post.author.id !== user?.id && (
            <FollowButton
              isFollowing={isFollowing}
              username={post.author.username}
              handleFollowClick={handleFollowClick}
            />
          )}

          {post.author.id === user?.id && (
            <>
              <button
                type='button'
                title='Options'
                aria-label='Options'
                className='w-6'
                onClick={handleClickOptionsButton}
              >
                <img src={optionsIcon} aria-hidden alt='' />
              </button>

              {areOptionsVisible ? (
                <div className='absolute right-10 z-10 flex flex-col overflow-hidden rounded bg-purple-800 text-center text-xs shadow-xl'>
                  <button
                    type='button'
                    className='border-placeholder border-b px-2 py-1 transition-[background-color_0.2s_ease-out] hover:bg-purple-700'
                    title='Copy post link to the clipboard'
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `${window.location.origin}/post/${post.id}`,
                      );
                    }}
                  >
                    {'copy link'}
                  </button>
                  <button
                    type='button'
                    className='border-placeholder border-b px-2 py-1 transition-[background-color_0.2s_ease-out] hover:bg-purple-700'
                  >
                    {'update'}
                  </button>
                  <button
                    type='button'
                    className='px-2 py-1 transition-[background-color_0.2s_ease-out] hover:bg-purple-700'
                    onClick={() => {
                      setIsDeleteModalVisible(true);
                    }}
                  >
                    {'delete'}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </header>

        {/* slideshow container */}
        <div className='mb-1'>
          <div className='slide'>
            <img
              src={`/cdn/pictures/posts/${post.picture}`}
              alt=''
              className='w-full'
            />
          </div>
        </div>

        {/* post content */}
        <div className='p-2'>
          <div className='flex items-center gap-2'>
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
              <button
                type='button'
                className='text-title p-1 text-xs'
                title='Show the likes'
                onClick={() => {
                  displayLikesModal(true);
                }}
              >
                {!!postLike.likeCount ? postLike.likeCount : ''}
              </button>
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
              <span className='text-title p-1 text-xs'>
                {post.commentCount}
              </span>
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

      {/* comments modal */}
      {areCommentsVisible ? (
        <BodyPortal>
          <PostComments
            displayCommentsModal={displayCommentsModal}
            postId={post.id}
          />
        </BodyPortal>
      ) : null}

      {/* likes modal */}
      {areLikesVisible ? (
        <BodyPortal>
          <PostLikes displayLikesModal={displayLikesModal} postId={post.id} />
        </BodyPortal>
      ) : null}

      {/* options overlay */}
      {areOptionsVisible ? (
        <BodyPortal>
          <>
            <div
              className='fixed top-0 left-0 z-6 h-full w-full'
              onClick={handleClickOptionsOverlay}
            />
            {isDeleteModalVisible ? (
              <article className='fixed top-1/2 left-1/2 z-11 flex w-64 -translate-1/2 flex-col items-center rounded-lg bg-purple-950 p-4 shadow-2xl'>
                <img src={warningIcon} alt='' className='w-16' />
                <h2 className='mb-4 text-center text-sm'>
                  {'Are you sure you want to permanantly delete this post ?'}
                </h2>

                <div className='flex gap-4'>
                  <button
                    title='Do not delete'
                    type='button'
                    className='border-turquoise-blue-400 text-turquoise-blue-400 text-title rounded border px-2 py-0.5 text-xs'
                    onClick={() => {
                      setIsDeleteModalVisible(false);
                    }}
                  >
                    {'Cancel'}
                  </button>
                  <button
                    title='Delete the post'
                    type='button'
                    className='border-danger text-danger text-title rounded border px-2 py-0.5 text-xs'
                    onClick={handleClickConfirmDelete}
                  >
                    {'Confirm'}
                  </button>
                </div>
                {isSetDeleteErrorMessage ? (
                  <p className='text-danger text-xs'>
                    {
                      "Something went wrong, your post hasn't been deleted, please retry later"
                    }
                  </p>
                ) : null}
              </article>
            ) : null}
            {isSetDeleteSuccessMessage ? (
              <article className='fixed top-1/2 left-1/2 z-11 flex w-64 -translate-1/2 flex-col items-center rounded-lg bg-purple-950 p-4 shadow-2xl'>
                <p className='text-turquoise-blue-400 text-center text-base'>
                  {'Your post has been successfully deleted'}
                </p>
              </article>
            ) : null}
          </>
        </BodyPortal>
      ) : null}
    </>
  );
}

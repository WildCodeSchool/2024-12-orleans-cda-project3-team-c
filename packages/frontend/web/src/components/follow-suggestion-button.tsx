import { useState } from 'react';

import followApiConnection from '../api-connection/follow-api-connection';

type FollowButtonProps = Readonly<{
  followeeId: number;
}>;

function FollowButton({ followeeId }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = async () => {
    let newState;
    if (isFollowing) {
      newState = await followApiConnection.unfollowUser(followeeId);
      // setIsFollowing(false);
    } else {
      newState = await followApiConnection.followUser(followeeId);
      // setIsFollowing(true);
    }
    if (newState !== null) {
      setIsFollowing(newState.isFollowing);
    }
  };

  // const togglePostLike = async () => {
  //   // Vérifier l'atat de postIsLiked
  //   let newState: PostLike;
  //   if (postLike.isLiked) {
  //     newState = await postLikeApiConnection.unlikePost(post.id);
  //   } else {
  //     newState = await postLikeApiConnection.likePost(post.id);
  //   }
  //   if (newState) {
  //     setPostLike({
  //       isLiked: newState.isLiked,
  //       likeCount: newState.likeCount ?? 0,
  //     });
  //   }
  // };

  // const handleFollowClick = useCallback(async () => {
  //   try {

  //     onFollowChange(!isFollowing);
  //   } catch (error) {
  //     console.error('Error toggling follow status:', error);
  //   }
  // }, [followerId, followeeId, isFollowing, onFollowChange]);

  return (
    <button
      type='button'
      onClick={handleFollowClick}
      className={`ml-auto h-6 w-14 cursor-pointer rounded border py-0.5 text-xs ${
        isFollowing
          ? 'border-rose-600 text-rose-600'
          : 'border-turquoise-blue-400 text-turquoise-blue-400 bg-transparent'
      }`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;

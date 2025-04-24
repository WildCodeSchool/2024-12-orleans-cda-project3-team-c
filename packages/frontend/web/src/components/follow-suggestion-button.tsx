import { useCallback, useEffect, useState } from 'react';

import followApiConnection from '../api-connection/follow-suggestion-api-connection';

type FollowButtonProps = Readonly<{
  followerId: number;
  followeeId: number;
  onFollowChange: (isFollowing: boolean) => void;
  isFollowing: boolean;
}>;

function FollowButton({
  followerId,
  followeeId,
  onFollowChange,
  isFollowing: initialIsFollowing,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const status = await followApiConnection.checkFollowStatus(
          followerId,
          followeeId,
        );
        if (status && 'isFollowing' in status) {
          setIsFollowing(status.isFollowing);
        }
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    void fetchFollowStatus();
  }, [followerId, followeeId]);

  const handleFollowClick = useCallback(async () => {
    try {
      if (isFollowing) {
        await followApiConnection.unfollowUser(followerId, followeeId);
        setIsFollowing(false);
      } else {
        await followApiConnection.followUser(followerId, followeeId);
        setIsFollowing(true);
      }
      onFollowChange(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  }, [followerId, followeeId, isFollowing, onFollowChange]);

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

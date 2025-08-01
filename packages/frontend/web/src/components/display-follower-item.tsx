import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { UserFollower } from '@app/api';

import followUpApiConnection from '@/api-connection/follow-up-api-connection';
import userFollowersApi from '@/api-connection/user-followers-api';

import certificationIcon from '../assets/icons/certification-pink.png';
import FollowButton from './follow-suggestion-button';

type UserFollowersId = {
  readonly followerId: number;
  readonly viewType: 'followers' | 'followees';
};

type FollowApiResponse = {
  followers: UserFollower[];
  followees: UserFollower[];
};

export default function DisplayFollowerItem({
  followerId,
  viewType,
}: UserFollowersId) {
  const [userFollowers, setUserFollowers] = useState<FollowApiResponse | null>(
    null,
  );
  const [follows, setFollows] = useState<Record<number, boolean>>({});
  const [followCounts, setFollowCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    (async () => {
      try {
        const userFollowersResponse =
          await userFollowersApi.getUserFollowers(followerId);
        if (!userFollowersResponse) {
          console.error('No user followers data found');
          return;
        }
        setUserFollowers(userFollowersResponse.data);

        const initialfollows: Record<number, boolean> = {};
        const initialFollowCounts: Record<number, number> = {};

        if (userFollowersResponse.data) {
          userFollowersResponse.data.followers.map((user: UserFollower) => {
            initialfollows[user.id] = false;
            return null;
          });

          userFollowersResponse.data.followees.map((user: UserFollower) => {
            initialfollows[user.id] = true;
            initialFollowCounts[user.id] =
              userFollowersResponse.data?.followees.length ?? 0;
            return null;
          });
        }

        setFollows(initialfollows);
        setFollowCounts(initialFollowCounts);
      } catch (error) {
        console.error('Error fetching user followers:', error);
      }
    })();
  }, [followerId]);

  const handleFollowClick = async (userId: number) => {
    let newState;
    if (follows[userId]) {
      newState = await followUpApiConnection.unfollowUser(userId);
      if (newState !== null) {
        setFollows((prevStates) => ({
          ...prevStates,
          [userId]: false,
        }));
        setFollowCounts((prevCounts) => ({
          ...prevCounts,
          [userId]: prevCounts[userId] > 0 ? prevCounts[userId] - 1 : 0, //
        }));
      }
    } else {
      newState = await followUpApiConnection.followUser(userId);
      if (newState !== null) {
        setFollows((prevStates) => ({
          ...prevStates,
          [userId]: true,
        }));
        setFollowCounts((prevCounts) => ({
          ...prevCounts,
          [userId]: (prevCounts[userId] || 0) + 1,
        }));
      }
    }
  };

  const userFollowersData =
    viewType === 'followers'
      ? (userFollowers?.followers ?? [])
      : (userFollowers?.followees ?? []);

  const title = viewType === 'followers' ? 'Followers' : 'Followees';

  return (
    <div className='w-full text-white lg:flex lg:flex-col'>
      {userFollowersData.length === 0 ? (
        <p className='text-gray-300'>{`You don't have any ${title.toLowerCase()} at the moment.`}</p>
      ) : (
        userFollowersData.map((userFollower: UserFollower) => (
          <Link
            to={`/profile/${userFollower.username}`}
            key={userFollower.id}
            className='mb-4 flex items-center justify-between'
          >
            <div className='flex items-center'>
              <img
                src={`/cdn/pictures/users/${userFollower.profile_picture}`}
                alt={userFollower.username}
                className='size-8 rounded'
              />
              <div className='ml-4 flex flex-col justify-center'>
                <p className='flex gap-1 text-xs md:text-base'>
                  {userFollower.username}
                  {userFollower.status === 'certified' ? (
                    <img
                      src={certificationIcon}
                      alt='certification'
                      className='size-3 md:size-4'
                    />
                  ) : null}{' '}
                </p>
                <p className='text-[8px] opacity-65'>
                  {followCounts[userFollower.id] || 0}
                  {' followers'}
                </p>
              </div>
            </div>

            <FollowButton
              isFollowing={follows[userFollower.id] || false}
              handleFollowClick={() => handleFollowClick(userFollower.id)}
              username={userFollower.username}
            />
          </Link>
        ))
      )}
    </div>
  );
}

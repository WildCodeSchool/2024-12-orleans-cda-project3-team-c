import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { UserSuggestion } from '@app/api';

import userApiConnection from '@/api-connection/user-suggestion-api-connection';

import followApiConnection from '../api-connection/follow-api-connection';
import FollowButton from './follow-suggestion-button';

const cdnUrl = import.meta.env.VITE_CDN_URL;

function UserSuggestionContainer() {
  const [usersData, setUsersData] = useState<UserSuggestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSuggestions = await userApiConnection.getUserSuggestions();
        setUsersData(userSuggestions);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <aside className='absolute top-40 right-8 hidden w-64 text-white lg:flex lg:flex-col'>
      <div className='mb-6 text-base'>
        <h1>{'Suggestions'}</h1>
      </div>
      <div>
        {usersData.map((user) => (
          <UserSuggestionItem key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
}

function UserSuggestionItem({ user }: { readonly user: UserSuggestion }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(user.follower_count);

  const handleFollowClick = async () => {
    let newState;
    if (isFollowing) {
      newState = await followApiConnection.unfollowUser(user.id);
      // setIsFollowing(false);
    } else {
      newState = await followApiConnection.followUser(user.id);
      // setIsFollowing(true);
    }
    if (newState !== null) {
      setIsFollowing(newState.isFollowing);
      setFollowCount(newState.followerCount ?? 0);
    }
  };

  return (
    <div className='mb-2 flex h-8 items-center justify-center text-sm'>
      <Link to={`/profile/${user.id}`} className='flex items-center'>
        <img
          src={`${cdnUrl}/pictures/users/${user.profile_picture}`}
          alt={`${user.username}'s profile`}
          className='mr-1 h-8 w-8 rounded text-center'
        />
        <div className='flex flex-col'>
          <h2 className='font-title text-center text-sm'>{user.username}</h2>
          <p className='text-[8px] opacity-60'>
            {followCount} {'followers'}
          </p>
        </div>
      </Link>
      <FollowButton
        isFollowing={isFollowing}
        handleFollowClick={handleFollowClick}
      />
    </div>
  );
}

export default UserSuggestionContainer;

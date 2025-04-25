import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { UserSuggestion } from '@app/api';

import userApiConnection from '@/api-connection/user-suggestion-api-connection';

import FollowButton from './follow-suggestion-button';

const cdnUrl = import.meta.env.VITE_CDN_URL;

type UserWithFollowersResponse = {
  id: number;
  username: string;
  profile_picture: string;
  followers_count: number;
};

function UserSuggestionContainer() {
  const [usersData, setUsersData] = useState<UserSuggestion[]>([]);
  const [isFollowingMap, setIsFollowingMap] = useState<Record<number, boolean>>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSuggestions = await userApiConnection.getUserSuggestions();

        // const followStatusMap: Record<number, boolean> = {};
        // for (const user of usersWithFollowers) {
        //   const status = await followApiConnection.checkFollowStatus(
        //     followerId,
        //     user.id,
        //   );
        //   if (status && 'isFollowing' in status) {
        //     followStatusMap[user.id] = status.isFollowing;
        //   }
        // }
        setUsersData(userSuggestions);
        console.log(userSuggestions);
      } catch (error) {
        console.error('Error fetching users data:', error);
      } finally {
        setIsLoading(false);
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
            {user.follower_count} {'followers'}
          </p>
        </div>
      </Link>
      <FollowButton followeeId={user.id} />
    </div>
  );
}

export default UserSuggestionContainer;

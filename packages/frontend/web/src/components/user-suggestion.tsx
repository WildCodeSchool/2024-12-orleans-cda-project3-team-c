import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import followApiConnection from '@/api-connection/follow-suggestion-api-connection';
import userApiConnection from '@/api-connection/user-suggestion-api-connection';

import FollowButton from './follow-suggestion-button';

const cdnUrl = import.meta.env.VITE_CDN_URL;

type UserWithFollowersResponse = {
  id: number;
  username: string;
  profile_picture: string;
  followers_count: number;
};

function UserSuggestion() {
  const [usersData, setUsersData] = useState<UserWithFollowersResponse[]>([]);
  const [isFollowingMap, setIsFollowingMap] = useState<Record<number, boolean>>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const followerId = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersWithFollowers =
          await userApiConnection.getUsersWithFollowers();

        const followStatusMap: Record<number, boolean> = {};
        for (const user of usersWithFollowers) {
          const status = await followApiConnection.checkFollowStatus(
            followerId,
            user.id,
          );
          if (status && 'isFollowing' in status) {
            followStatusMap[user.id] = status.isFollowing;
          }
        }
        setIsFollowingMap(followStatusMap);

        let filteredUsers = usersWithFollowers.filter(
          (user) => !followStatusMap[user.id] && user.id !== followerId,
        );

        filteredUsers = shuffleArray(filteredUsers);

        setUsersData(filteredUsers);
      } catch (error) {
        console.error('Error fetching users data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch(console.error);
  }, [followerId]);

  const handleFollowChange = (userId: number, isFollowing: boolean) => {
    setIsFollowingMap((prevMap) => ({
      ...prevMap,
      [userId]: isFollowing,
    }));

    setUsersData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const shuffleArray = (array: UserWithFollowersResponse[]) => {
    const shuffled = [...array];
    for (
      let currentIndex = shuffled.length - 1;
      currentIndex > 0;
      currentIndex--
    ) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ];
    }
    return shuffled;
  };

  if (isLoading) {
    return null;
  }

  return (
    <aside className='absolute top-40 right-8 hidden w-64 text-white lg:flex lg:flex-col'>
      <div className='mb-6 text-base'>
        <h1>{'Suggestions'}</h1>
      </div>
      <div>
        {usersData.slice(0, 5).map((user) => (
          <div
            key={user.id}
            className='mb-2 flex h-8 items-center justify-center text-sm'
          >
            <Link to={`/profile/${user.id}`} className='flex items-center'>
              <img
                src={`${cdnUrl}/pictures/users/${user.profile_picture}`}
                alt={`${user.username}'s profile`}
                className='mr-1 h-8 w-8 rounded text-center'
              />
              <div className='flex flex-col'>
                <h2 className='font-title text-center text-sm'>
                  {user.username}
                </h2>
                <p className='text-[8px] opacity-60'>
                  {user.followers_count} {'followers'}
                </p>
              </div>
            </Link>
            <FollowButton
              followerId={followerId}
              followeeId={user.id}
              onFollowChange={(isFollowing) => {
                handleFollowChange(user.id, isFollowing);
              }}
              isFollowing={isFollowingMap[user.id] || false}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}

export default UserSuggestion;

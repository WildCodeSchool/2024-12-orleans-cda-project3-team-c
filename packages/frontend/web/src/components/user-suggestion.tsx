import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import followApiConnection from '@/api-connection/follow-api-connection';
import followCountApiConnection from '@/api-connection/follow-count-api-connection';
import userApiConnection from '@/api-connection/user-api-connection';

import FollowButton from './follow-button';

function UserSuggestion() {
  const [followersCount, setFollowersCount] = useState<number | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const followerId = 10; // Remplacez par l'ID réel du follower
  const followeeId = 1; // Remplacez par l'ID réel du followee

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count =
          await followCountApiConnection.fetchFollowersCount(followeeId);
        setFollowersCount(count);
      } catch (error) {
        console.error('Error fetching followers count:', error);
      }

      try {
        const user = await userApiConnection.getUserById(followeeId);
        if (user) {
          setUsername(user.username);
          setProfilePicture(
            `http://localhost:3333/api/public/pictures/users/${user.profile_picture}`,
          );
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    void fetchData();
  }, [followeeId]);

  const handleFollowChange = async (isFollowing: boolean) => {
    if (isFollowing) {
      await followApiConnection.followUser(followerId, followeeId);
      setFollowersCount((prevCount) => (prevCount ?? 0) + 1);
    } else {
      await followApiConnection.unfollowUser(followerId, followeeId);
      setFollowersCount((prevCount) => Math.max((prevCount ?? 0) - 1, 0));
    }
    setIsFollowing(isFollowing);
  };

  return (
    <aside className='mt-40 mr-8 hidden w-56 text-white lg:flex lg:flex-col'>
      <div className='mb-6 text-base'>
        <h1>{'Suggestions'}</h1>
      </div>
      <div>
        <div className='mb-2 flex h-8 items-center justify-center text-sm'>
          <Link to='/profile' className='flex items-center'>
            <img
              src={profilePicture} // Utilisez profilePicture ici
              alt={`${username}'s profile`}
              className='mr-1 h-8 w-8 rounded text-center'
            />
            <div className='flex flex-col'>
              <h2 className='font-title text-center text-sm'>{username}</h2>
              {followersCount !== null && (
                <p className='text-[8px] opacity-60'>
                  {followersCount} {'followers'}
                </p>
              )}
            </div>
          </Link>
          <FollowButton
            followerId={followerId}
            followeeId={followeeId}
            onFollowChange={handleFollowChange}
            isFollowing={isFollowing}
          />
        </div>
      </div>
    </aside>
  );
}

export default UserSuggestion;

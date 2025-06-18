import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { UserSuggestion } from '@app/api';

import followUpApiConnection from '../api-connection/follow-up-api-connection';
import certificationIcon from '../assets/icons/certification-pink.png';
import FollowButton from './follow-suggestion-button';

function UserSuggestionItem({ user }: { readonly user: UserSuggestion }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(user.follower_count);

  const handleFollowClick = async () => {
    let newState;
    if (isFollowing) {
      newState = await followUpApiConnection.unfollowUser(user.id);
    } else {
      newState = await followUpApiConnection.followUser(user.id);
    }
    if (newState !== null) {
      setIsFollowing(newState.isFollowing);
      setFollowCount(newState.followerCount ?? 0);
    }
  };

  return (
    <div className='mb-2 flex h-8 items-center justify-between text-sm'>
      <Link
        to={`/profile/${user.id}`}
        className='flex items-center'
        title={`See ${user.username}'s profile`}
      >
        <img
          src={`/cdn/pictures/users/${user.profile_picture}`}
          alt={`${user.username}'s profile`}
          className='mr-1 h-8 w-8 rounded text-center'
        />
        <div className='flex flex-col'>
          <h2 className='font-title xs:max-w-none xs:truncate-none flex max-w-[180px] gap-1 truncate text-sm'>
            {user.username}
            {user.status === 'certified' ? (
              <img
                src={certificationIcon}
                alt='certification'
                className='size-3 md:size-4'
              />
            ) : null}
          </h2>
          <p className='text-[8px] opacity-60'>
            {followCount}{' '}
            {`follower${followCount && followCount > 1 ? 's' : ''}`}
          </p>
        </div>
      </Link>
      <FollowButton
        isFollowing={isFollowing}
        handleFollowClick={handleFollowClick}
        username={user.username}
      />
    </div>
  );
}

export default UserSuggestionItem;

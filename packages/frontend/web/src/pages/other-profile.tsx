import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import type { UserProfile } from '@app/api';

import followUpApiConnection from '@/api-connection/follow-up-api-connection';
import FollowButton from '@/components/follow-suggestion-button';
import UserProfiles from '@/components/user-profiles';
import UserProfilesPosts from '@/components/user-profiles-posts';

import menuDotsBlue from '../assets/icons/menu-dots-blue.svg';

export default function OtherProfile() {
  const { profile } = useLoaderData<{ profile: UserProfile | null }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(profile?.followersCount ?? 0);

  if (!profile) {
    return (
      <div className='pt-10 text-center text-white'>
        {'Erreur de chargement du profil...'}
      </div>
    );
  }

  const handleFollowClick = async () => {
    let newState;
    if (isFollowing) {
      newState = await followUpApiConnection.unfollowUser(profile.id);
    } else {
      newState = await followUpApiConnection.followUser(profile.id);
    }
    if (newState !== null) {
      setIsFollowing(newState.isFollowing);
      setFollowCount(newState.followerCount ?? 0);
    }
  };

  return (
    <section className='flex flex-col pt-4 pb-24 md:mx-auto md:w-[954px] md:pb-8'>
      <UserProfiles profile={profile} followersCountOverride={followCount} />
      <div className='mb-4 flex items-center gap-2 px-2 pt-4 sm:px-4 md:gap-4'>
        <FollowButton
          isFollowing={isFollowing}
          handleFollowClick={handleFollowClick}
          username={profile.username}
        />
        <button
          type='button'
          className='border-turquoise-blue-400 text-turquoise-blue-400 h-6 cursor-pointer rounded border px-2 text-xs'
        >
          {'messages'}
        </button>
        <img src={menuDotsBlue} alt='menu icon dots' className='w-6' />
      </div>
      <div className='border-turquoise-blue-400 border-t-2 pt-2' />
      <UserProfilesPosts
        basePosts={profile.posts}
        userId={profile.id}
        username={profile.username}
      />
    </section>
  );
}

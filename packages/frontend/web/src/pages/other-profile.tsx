import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import type { UserProfile } from '@app/api';

import followUpApiConnection from '@/api-connection/follow-up-api-connection';
import FollowButton from '@/components/follow-suggestion-button';
import UserProfilePage from '@/components/user-profile-page';

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
    <section className='mx-4 flex h-full flex-col pt-4 md:mx-auto md:w-[954px]'>
      <UserProfilePage profile={profile} followersCountOverride={followCount} />
      <div className='mb-4 flex items-center gap-2 pt-4 md:gap-4'>
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
        <img src={menuDotsBlue} alt='' className='w-6' />
      </div>
      <div className='border-turquoise-blue-400 border-t-2 pt-2' />
      <section className='grid h-82 grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'>
        {profile.posts.map((post) => (
          <div key={post.id} className='h-full overflow-hidden rounded-lg'>
            <img
              className='size-40 h-full md:size-81'
              src={
                post.picture
                  ? `/cdn/pictures/posts/${post.picture}`
                  : '/user-mock.png'
              }
              alt={`Post ${post.id}`}
            />
          </div>
        ))}
      </section>
    </section>
  );
}

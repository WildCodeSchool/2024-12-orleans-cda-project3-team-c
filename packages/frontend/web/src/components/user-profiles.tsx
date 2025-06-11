import type { UserProfile } from '@app/api';

import certificationIcon from '@/assets/icons/certification-pink.png';

type UserProfileProps = {
  readonly profile: UserProfile | null;
  readonly followersCountOverride?: number;
};

export default function UserProfiles({
  profile,
  followersCountOverride,
}: UserProfileProps) {
  if (!profile) {
    return <div>{'User profile not found'}</div>;
  }
  return (
    <section className='flex w-full flex-col pt-4'>
      <div className='mx-2 flex pb-4 sm:mx-4 md:pb-8'>
        <img
          className='size-16 rounded sm:size-40'
          src={
            profile.profile_picture
              ? `/cdn/pictures/users/${profile.profile_picture}`
              : `/cdn/pictures/users/${profile.profile_picture}`
          }
          alt={profile.username}
        />

        <div className='ml-4 flex w-full flex-col'>
          <div className='my-2 flex items-center gap-2'>
            <h1 className='font-title flex gap-2 text-sm sm:text-2xl'>
              {profile.username}
            </h1>
            {profile.status === 'certified' ? (
              <img
                src={certificationIcon}
                alt='certification'
                className='size-4 md:size-5'
              />
            ) : null}
            <p className='font-title text-turquoise-blue-400 text-xs sm:text-base'>
              {profile.likeCount}
              {` like${
                profile.likeCount !== null && profile.likeCount > 1 ? 's' : ''
              }`}
            </p>
          </div>
          <ul className='my-2 flex gap-4 text-xs sm:text-base'>
            <li className='flex items-center gap-1'>
              <span className='text-turquoise-blue-400'>
                {profile.postCount}
              </span>
              <span>{'posts'}</span>
            </li>
            <li className='flex items-center gap-1'>
              <span className='text-turquoise-blue-400'>
                {followersCountOverride ?? profile.followersCount}
              </span>
              <span>{'followers'}</span>
            </li>
            <li className='flex items-center gap-1'>
              <span className='text-turquoise-blue-400'>
                {profile.followingCount}
              </span>
              <span>{'following'}</span>
            </li>
          </ul>
          <p className='pb-2 text-sm'>{profile.biography}</p>
        </div>
      </div>
    </section>
  );
}

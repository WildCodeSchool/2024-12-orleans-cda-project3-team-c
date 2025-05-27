import type { UserProfile } from '@app/api';

type UserProfileProps = {
  readonly profile: UserProfile | null;
  readonly followersCountOverride?: number;
};

export default function UserProfilePage({
  profile,
  followersCountOverride,
}: UserProfileProps) {
  if (!profile) {
    return <div>{'User profile not found'}</div>;
  }
  return (
    <section className='flex w-3xs flex-col pt-4'>
      <div className='flex pb-4 md:pb-8'>
        <img
          className='size-16 rounded md:size-40'
          src={
            profile.profile_picture
              ? `/cdn/pictures/users/${profile.profile_picture}`
              : `/cdn/pictures/users/${profile.profile_picture}`
          }
          alt={profile.username}
        />
        <div className='ml-4 flex w-full flex-col'>
          <div className='my-2 flex items-center gap-2'>
            <p className='font-title text-sm sm:text-2xl'>{profile.username}</p>
            <p className='font-title text-turquoise-blue-400 text-xs sm:text-base'>
              {profile.notoriety}
            </p>
          </div>
          <ul className='my-2 flex gap-4 text-xs sm:text-base'>
            <li className='flex items-center gap-1'>
              <span className='text-turquoise-blue-400'>
                {profile.posts.length}
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
        </div>
      </div>
      <p className='pb-2 text-sm md:hidden'>{profile.biography}</p>
    </section>
  );
}

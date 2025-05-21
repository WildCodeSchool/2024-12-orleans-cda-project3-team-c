import { Link, useLoaderData } from 'react-router-dom';

import type { UserProfile } from '@app/api';

import menu from '@/assets/icons/menu-square-white.svg';

export default function ProfilePage() {
  const { profile } = useLoaderData<{ profile: UserProfile | null }>();
  if (!profile) {
    return (
      <div className='pt-10 text-center text-white'>
        {'Erreur de chargement du profil...'}
      </div>
    );
  }

  return (
    <section className='mx-4 flex flex-col pt-4 sm:mx-16 sm:pt-16'>
      <div className='md:border-turquoise-blue-400 flex items-start border-0 pb-4 md:border-b-2 md:pb-8'>
        <img
          className='size-16 rounded md:size-40'
          src={`/cdn/pictures/users/${profile.profile_picture}`}
          alt='User'
        />
        <div className='ml-4 w-full'>
          <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <p className='font-title text-sm sm:text-2xl'>
                  {profile.username}
                </p>
                <p className='font-title text-turquoise-blue-400 text-xs sm:text-base'>
                  {profile.notoriety}
                </p>
              </div>
              <Link to='/parameters'>
                <img className='size-6 md:size-8' src={menu} alt='Menu' />
              </Link>
            </div>

            <ul className='mb-2 flex gap-4 text-xs sm:text-base'>
              <li className='flex items-center gap-1'>
                <span className='text-turquoise-blue-400'>
                  {profile.posts.length}
                </span>
                <span>{'posts'}</span>
              </li>
              <li className='flex items-center gap-1'>
                <span className='text-turquoise-blue-400'>
                  {profile.followersCount}
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

            <p className='hidden max-w-lg text-base md:block'>
              {profile.biography}
            </p>
          </div>
        </div>
      </div>

      <p className='border-turquoise-blue-400 max-w-lg border-b-2 pb-4 text-sm md:hidden'>
        {profile.biography}
      </p>

      <section className='flex flex-wrap justify-center gap-2 pt-2'>
        {profile.posts.map((post, index) => (
          <div key={post.id} className='post'>
            <img
              className='size-40 sm:size-56 md:size-81'
              src={
                post.picture
                  ? `/cdn/pictures/posts/${post.picture}`
                  : '/user-mock.png'
              }
              alt={`Post ${index + 1}`}
            />
          </div>
        ))}
      </section>
    </section>
  );
}

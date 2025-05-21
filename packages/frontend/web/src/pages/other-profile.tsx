import { useLoaderData } from 'react-router-dom';

import type { UserProfile } from '@app/api';

import menuDotsBlue from '../assets/icons/menu-dots-blue.svg';

const cdnUrl = import.meta.env.VITE_CDN_URL;

export default function OtherProfile() {
  const { profile } = useLoaderData<{ profile: UserProfile | null }>();

  if (!profile) {
    return (
      <div className='pt-10 text-center text-white'>
        {'Erreur de chargement du profil...'}
      </div>
    );
  }

  return (
    <section className='mx-4 flex h-full flex-col pt-4 md:mx-auto md:w-[954px]'>
      <div className='flex items-start md:pb-8'>
        <img
          className='size-16 rounded md:size-40'
          src={`${cdnUrl}/pictures/users/${profile.profile_picture}`}
          alt='User'
        />

        <div className='ml-4 flex flex-col'>
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
            {
              'Lorem ipsum dolor sit amet consectetur. Sem convallis lectus interdum nulla.'
            }
          </p>
        </div>
      </div>

      <p className='pb-2 text-sm md:hidden'>
        {profile.biography}
        {
          'Lorem ipsum dolor sit amet consectetur. Sem convallis lectus interdum nulla.'
        }
      </p>
      <div className='mb-2 flex gap-4'>
        {/* <FollowButton /> */}

        <button
          type='button'
          className='border-turquoise-blue-400 text-turquoise-blue-400 h-6 cursor-pointer rounded border px-2 text-xs'
        >
          {'messages'}
        </button>
        <img src={menuDotsBlue} alt='' className='w-6' />
      </div>
      <div className='border-turquoise-blue-400 border-t-2 pt-2' />
      <section className='grid h-90 grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'>
        {profile.posts.map((post, index) => (
          <div key={post.id} className='h-full overflow-hidden rounded-lg'>
            <img
              className='size-40 h-full md:size-81'
              src={
                post.picture
                  ? `${cdnUrl}/pictures/posts/${post.picture}`
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

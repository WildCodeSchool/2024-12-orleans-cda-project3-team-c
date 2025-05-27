import { Link, useLoaderData } from 'react-router-dom';

import type { UserProfile } from '@app/api';

import menu from '@/assets/icons/menu-square-white.svg';
import UserProfilePage from '@/components/user-profile-page';

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
    <section className='mx-4 flex h-full flex-col pt-4 md:mx-auto md:w-[954px]'>
      <div className='flex justify-between'>
        <UserProfilePage profile={profile} />
        <Link to='/parameters' className='size-6 pt-4 md:size-8'>
          <img src={menu} alt='Menu' />
        </Link>
      </div>
      <p> {profile.biography} </p>
      <div className='border-turquoise-blue-400 border-t-2 pt-2' />
      <section className='grid h-82 grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'>
        {profile.posts.map((post) => (
          <div key={post.id}>
            <Link to={'posts/username/#post.id'}>
              <img
                className='size-40 sm:size-56 md:size-81'
                src={
                  post.picture
                    ? `/cdn/pictures/posts/${post.picture}`
                    : '/user-mock.png'
                }
                alt={`Post ${post.id}`}
              />
            </Link>
          </div>
        ))}
      </section>
    </section>
  );
}

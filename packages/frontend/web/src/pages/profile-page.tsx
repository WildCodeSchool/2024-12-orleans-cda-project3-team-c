import { Link, useLoaderData } from 'react-router-dom';

import type { UserProfile } from '@app/api';

import menu from '@/assets/icons/menu-square-white.svg';
import UserProfiles from '@/components/user-profiles';
import UserProfilesPosts from '@/components/user-profiles-posts';

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
    <section className='mx-4 flex flex-col pt-4 pb-16 md:mx-auto md:w-[954px]'>
      <div className='flex justify-between'>
        <UserProfiles profile={profile} />
        <Link to='/parameters' className='size-6 pt-4 md:size-8'>
          <img src={menu} alt='Menu' />
        </Link>
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

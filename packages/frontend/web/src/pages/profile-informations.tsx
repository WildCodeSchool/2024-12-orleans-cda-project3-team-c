import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import userApiConnection, {
  type UserProfile,
} from '../api-connection/user-api-connection';
import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';

export default function ProfileInformations() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const profile = await userApiConnection.getOwnProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Erreur de récupération des données :', error);
      }
    };

    void fetchData();
  }, []);

  if (!userProfile) {
    return (
      <div className='pt-10 text-center text-white'>{'Loading profile...'}</div>
    );
  }

  return (
    <section className='mt-4 flex w-full flex-col items-center sm:mt-40'>
      <div className='item-start flex w-full justify-start sm:items-center sm:justify-center'>
        <Link to='/parameters'>
          <img className='h-8 w-8' src={arrowLeftIcon} alt='arrow left icon' />
        </Link>
        <h2 className='font-title ml-16 text-2xl'>{'Profile Informations'}</h2>
      </div>
      <img
        className='mt-8 mb-8 h-16 w-16 rounded-md'
        src={
          userProfile.profile_picture || '../assets/icons/user-white.svg.jpg'
        }
        alt='user'
      />

      <Link
        className='text-turquoise-blue-400 border-turquoise-blue-400 rounded-md border px-2 py-1 text-sm'
        to='/edit-profile'
      >
        {/* update la photo de l'utilisateur actuel */}
        <p>{'Edit profile picture'}</p>
      </Link>

      <div className='mt-4 flex w-72 items-center justify-between rounded-md border border-purple-900 px-3 py-2'>
        <div className='flex flex-col'>
          <p className='text-sm'>{'Username'}</p>
          <p className='font-title text-base'>
            {'@'}
            {userProfile.username}
          </p>
        </div>
        <div className='flex h-6'>
          <Link
            className='text-turquoise-blue-400 border-turquoise-blue-400 flex w-10 items-center justify-center rounded-md border text-sm'
            to='/edit-username'
          >
            <p>{'Edit'}</p>
          </Link>
        </div>
      </div>

      <div className='mt-4 mb-8 flex w-72 items-center justify-between rounded-md border border-purple-900 px-3 py-2'>
        <div className='flex flex-col pr-6'>
          <p className='text-sm'>{'Bio'}</p>
          <p className='text-base'>{userProfile.biography}</p>
        </div>
        <div className='flex h-6'>
          <Link
            className='text-turquoise-blue-400 border-turquoise-blue-400 flex w-10 items-center justify-center rounded-md border text-sm'
            to='/edit-bio'
          >
            <p>{'Edit'}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

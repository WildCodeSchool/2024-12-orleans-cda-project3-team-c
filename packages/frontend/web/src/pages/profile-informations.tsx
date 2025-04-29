import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import userApiConnection from '@/api-connection/user-api-connection';
import type { UserProfile } from '@/api-connection/user-api-connection';
import arrowLeftIcon from '@/assets/icons/arrow-left-white.svg';

const cdnUrl = import.meta.env.VITE_CDN_URL;

export default function ProfileInformations() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async (): Promise<void> => {
    try {
      const profile = await userApiConnection.getProfile();
      setUserProfile(profile);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          '[ProfileInformations] → Erreur chargement profil:',
          error.message,
        );
      } else {
        console.error(
          '[ProfileInformations] → Erreur chargement profil: Unkown error',
        );
      }
      setUserProfile(null);
    }
  };

  const handleProfilePictureChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await userApiConnection.updateProfilePicture(file);
      await fetchProfile();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          '[ProfileInformations] → Erreur mise à jour image:',
          error.message,
        );
      } else {
        console.error(
          '[ProfileInformations] → Erreur mise à jour image: Unknown error',
        );
      }
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile();
    };

    loadProfile().catch((error: unknown) => {
      if (error instanceof Error) {
        console.error(
          '[ProfileInformations] → Erreur lors du chargement du profil:',
          error.message,
        );
      } else {
        console.error(
          '[ProfileInformations] → Erreur lors du chargement du profil: Unknown error',
        );
      }
    });
  }, []);

  if (!userProfile) {
    return (
      <div className='pt-10 text-center text-white'>
        {'Erreur de chargement du profil...'}
      </div>
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
        className='mt-8 mb-4 h-16 w-16 rounded-md object-cover'
        src={`${cdnUrl}/pictures/users/${userProfile.profile_picture || 'user.png'}`}
        alt='user'
      />

      <label
        htmlFor='profilePicUpload'
        className='text-turquoise-blue-400 border-turquoise-blue-400 cursor-pointer rounded-md border px-2 py-1 text-sm'
      >
        {'Change profile picture'}
        <input
          id='profilePicUpload'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleProfilePictureChange}
        />
      </label>

      <div className='mt-4 flex w-72 items-center justify-between rounded-md border border-purple-900 px-3 py-2'>
        <div className='flex flex-col'>
          <p className='text-sm'>{'Username'}</p>
          <p className='font-title text-base'>{'@' + userProfile.username}</p>
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

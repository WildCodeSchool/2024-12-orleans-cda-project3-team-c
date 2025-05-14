import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import type { UserProfile } from '@app/api';

import userApiConnection from '@/api-connection/user-api-connection';
import arrowLeftIcon from '@/assets/icons/arrow-left-white.svg';

const cdnUrl = import.meta.env.VITE_CDN_URL;

export default function ProfileInformations() {
  const { profile } = useLoaderData<{ profile: UserProfile | null }>();
  const [profilePicturePath, setProfilePicturePath] = useState<
    string | undefined
  >(
    profile?.profile_picture
      ? `${cdnUrl}/pictures/users/${profile.profile_picture}`
      : `${cdnUrl}/pictures/users/user.png`,
  );

  const handleProfilePictureChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await userApiConnection.updateProfilePicture(file);
      const newPictureUrl = URL.createObjectURL(file);
      setProfilePicturePath(newPictureUrl);
    } catch (error) {
      console.error('Error while updating the profile picture:', error);
    }
  };

  if (!profile) {
    return (
      <div className='pt-10 text-center text-white'>
        {'Profile loading error...'}
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
      <form>
        <img
          className='mt-8 mb-4 h-16 w-16 rounded-md object-cover'
          src={profilePicturePath}
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
            className='hidden'
            onChange={handleProfilePictureChange}
          />
        </label>
      </form>

      <div className='mt-4 flex w-72 items-center justify-between rounded-md border border-purple-900 px-3 py-2'>
        <div className='flex flex-col'>
          <p className='text-sm'>{'Username'}</p>
          <p className='font-title text-base'>{'@' + profile.username}</p>
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
          <p className='text-base'>{profile.biography}</p>
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

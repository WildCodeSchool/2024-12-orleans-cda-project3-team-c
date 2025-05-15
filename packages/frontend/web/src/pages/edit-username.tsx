import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { UserProfile } from '@app/api';

import userApiConnection from '../api-connection/user-api-connection';
import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';

export default function EditUsername() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const fetchData = async (): Promise<void> => {
    try {
      const profile = await userApiConnection.getProfile();
      setUserProfile(profile);
      setUsername(profile?.username ?? '');
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 30) {
      setUsername(value);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccessMessage(undefined);
      setErrorMessage(undefined);

      await userApiConnection.updateUsername(username);
      setSuccessMessage('Username updated successfully');

      await fetchData();
    } catch (error) {
      console.error('Error updating username:', error);
      setErrorMessage('Username already used');
    } finally {
      setSaving(false);
    }
  };

  if (!userProfile) {
    return (
      <div className='pt-10 text-center text-white'>{'Loading profile...'}</div>
    );
  }

  return (
    <>
      <section className='item-start mt-4 flex flex-col pl-4 sm:mt-40 sm:items-center sm:pl-0'>
        <div className='flex w-72 items-center'>
          <Link to='/profile-informations'>
            <img
              className='h-8 w-8'
              src={arrowLeftIcon}
              alt='arrow left icon'
            />
          </Link>
          <h2 className='font-title ml-16 text-2xl'>{'Username'}</h2>
        </div>
      </section>

      <section className='flex flex-col items-start pl-4 sm:items-center sm:pl-0'>
        <div className='mt-8 flex h-6 w-72 items-center'>
          <p>
            {'Your username : '}
            {`@${userProfile.username}`}
          </p>
        </div>

        <div className='mt-6 flex w-72 justify-end p-0'>
          <p className='text-placeholder text-xs'>{`${username.length}/30`}</p>
        </div>

        <form className='mt-1 flex h-6 w-72 items-center rounded-md border border-gray-300 bg-purple-900 p-2'>
          <p className='text-xs'>{'@'}</p>
          <input
            className='flex-1 bg-purple-900 text-xs text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none'
            type='text'
            placeholder={userProfile.username}
            value={username}
            onChange={handleChange}
          />
        </form>
      </section>

      <div className='mt-8 flex flex-col items-center gap-2 pl-4 sm:w-full sm:pl-0'>
        <button
          type='button'
          onClick={handleSave}
          disabled={saving}
          className='text-turquoise-blue-400 border-turquoise-blue-400 flex w-24 cursor-pointer items-center justify-center rounded-md border py-1 text-xs'
        >
          {saving ? 'Saving...' : 'Save'}
        </button>

        {successMessage ? (
          <p className='text-xs text-green-400'>{successMessage}</p>
        ) : null}

        {errorMessage ? (
          <p className='text-xs text-red-400'>{errorMessage}</p>
        ) : null}
      </div>
    </>
  );
}

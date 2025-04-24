import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import userApiConnection, {
  type UserProfile,
} from '../api-connection/user-api-connection';
import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';

export default function EditBio() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [biography, setBiography] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const fetchData = async (): Promise<void> => {
    try {
      const profile = await userApiConnection.getProfile();
      setUserProfile(profile);
      setBiography(profile.biography);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const handleBiographyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    if (value.length <= 350) {
      setBiography(value);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccessMessage(undefined);
      setErrorMessage(undefined);

      await userApiConnection.updateBiography(biography);
      setSuccessMessage('Biography updated successfully');

      await fetchData(); // refresh local data
    } catch (error) {
      console.error('Error updating biography:', error);
      setErrorMessage('Error during saving');
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
          <h2 className='font-title ml-16 text-2xl'>{'Biography'}</h2>
        </div>
      </section>

      <section className='flex flex-col items-start pl-4 sm:items-center sm:pl-0'>
        <div className='mt-6 flex w-72 justify-end'>
          <p className='text-placeholder text-xs'>{`${biography.length}/350`}</p>
        </div>

        <div className='mt-1 flex w-72 items-center rounded-md border border-gray-300 bg-purple-900 p-1'>
          <textarea
            className='h-40 flex-1 bg-purple-900 px-2 py-1 text-xs leading-tight text-white placeholder-gray-500 focus:outline-none'
            value={biography}
            onChange={handleBiographyChange}
            placeholder='Write something about yourself...'
          />
        </div>
      </section>

      <div className='mt-8 flex flex-col items-center gap-2 pl-4 sm:w-full sm:pl-0'>
        <button
          type='button'
          onClick={handleSave}
          disabled={saving}
          className='border-turquoise-blue-400 text-turquoise-blue-400 flex w-24 cursor-pointer items-center justify-center rounded-md border py-1 text-xs'
        >
          {saving ? 'Saving...' : 'Save'}
        </button>

        {!!successMessage && (
          <p className='text-xs text-green-400'>{successMessage}</p>
        )}
        {!!errorMessage && (
          <p className='text-xs text-red-400'>{errorMessage}</p>
        )}
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';

import type { UserSuggestion } from '@app/api';

import userApiConnection from '@/api-connection/user-suggestion-api-connection';

import closeSquareIcon from '../assets/icons/close-square-white.svg';
import UserSuggestionItem from './user-suggestion-item';

type UserSuggestionContainerProps = {
  readonly className?: string;
};

function UserSuggestionContainer({
  className = '',
}: Readonly<UserSuggestionContainerProps>) {
  const [usersData, setUsersData] = useState<UserSuggestion[]>([]);
  const [isSuggestionButtonVisible, setIsSuggestionButtonVisible] =
    useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userSuggestions = await userApiConnection.getUserSuggestions();
        setUsersData(userSuggestions);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    })();
  }, []);

  if (!isSuggestionButtonVisible) {
    return null;
  }

  return (
    <div className={` ${className}`}>
      <div className='mb-6 flex justify-between text-base'>
        <h1>{'Suggestions'}</h1>
        <button
          type='button'
          onClick={() => {
            setIsSuggestionButtonVisible(false);
          }}
          className='lg:hidden'
        >
          <img className='h-8 w-8' src={closeSquareIcon} alt='close icon' />
        </button>
      </div>
      <div>
        {usersData.map((user) => (
          <UserSuggestionItem key={user.id} user={user} />
        ))}
      </div>
      <div className='mx-auto my-6 w-[80%] border-b-2 border-purple-900 lg:hidden' />
    </div>
  );
}

export default UserSuggestionContainer;

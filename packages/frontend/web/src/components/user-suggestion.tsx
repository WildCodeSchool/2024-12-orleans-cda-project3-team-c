import { useEffect, useState } from 'react';

import type { UserSuggestion } from '@app/api';

import userApiConnection from '@/api-connection/user-suggestion-api-connection';

import UserSuggestionItem from './user-suggestion-item';

function UserSuggestionContainer() {
  const [usersData, setUsersData] = useState<UserSuggestion[]>([]);

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

  return (
    <div className='mt-40 mr-8 hidden w-72 text-white md:hidden lg:flex lg:flex-col'>
      <div className='mb-6 text-base'>
        <h1>{'Suggestions'}</h1>
      </div>
      <div>
        {usersData.map((user) => (
          <UserSuggestionItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UserSuggestionContainer;

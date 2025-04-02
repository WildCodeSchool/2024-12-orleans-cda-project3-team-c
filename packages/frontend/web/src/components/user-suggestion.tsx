import { useState } from 'react';
import { Link } from 'react-router-dom';

import userPng from '../assets/pictures/users/user.png';

function UserSuggestion() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing((prevState) => !prevState);
  };

  return (
    <aside className='mt-40 mr-8 hidden w-56 text-white lg:flex lg:flex-col'>
      <div className='mb-6 text-base'>
        <h1>{'Suggestions'}</h1>
      </div>
      <div>
        <div className='mb-2 flex h-8 items-center justify-center text-sm'>
          <Link to='/profile' className='flex items-center'>
            <img
              src={userPng}
              alt={`'@Eagle's profile`}
              className='mr-1 h-8 w-8 rounded text-center'
            />
            <div className='flex flex-col'>
              <h2 className='font-title text-center text-sm'>{'@Eagle'}</h2>
              <p className='text-[8px] opacity-60'>
                {120} {'followers'}
              </p>
            </div>
          </Link>
          <button
            type='button'
            onClick={handleFollowClick}
            className={`ml-auto h-6 w-14 cursor-pointer rounded border py-0.5 text-xs ${isFollowing ? 'border-rose-600 text-rose-600' : 'border-turquoise-blue-400 text-turquoise-blue-400 bg-transparent'}`}
          >
            {isFollowing ? 'unfollow' : 'follow'}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default UserSuggestion;

import { useState } from 'react';
import { Link } from 'react-router-dom';

import userPng from '../assets/pictures/users/user.png';

type UserProps = {
  id: string;
  username: string;
  followerCount: number;
  profileImage: string;
  isFollowing: boolean;
};

const usersData: UserProps[] = [
  {
    id: '1',
    username: '@Eagle',
    followerCount: 120,
    profileImage: userPng,
    isFollowing: false,
  },
  {
    id: '2',
    username: '@Romaric_Blt',
    followerCount: 250,
    profileImage: userPng,
    isFollowing: false,
  },
  {
    id: '3',
    username: '@leeloo',
    followerCount: 340,
    profileImage: userPng,
    isFollowing: false,
  },
  {
    id: '4',
    username: '@science.meme.fr',
    followerCount: 860,
    profileImage: userPng,
    isFollowing: false,
  },
];

function UserSuggestion() {
  const [users, setUsers] = useState(usersData);

  const handleFollowClick = (clickedId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === clickedId
          ? { ...user, isFollowing: !user.isFollowing }
          : user,
      ),
    );
  };

  return (
    <aside className='mt-40 mr-8 hidden w-56 text-white lg:flex lg:flex-col'>
      <div className='mb-6 text-base'>
        <h1>{'Suggestions'}</h1>
      </div>
      <div>
        {users.map((user) => (
          <div
            key={user.id}
            className='mb-2 flex h-8 items-center justify-center text-sm'
          >
            <Link to='/profile' className='flex items-center'>
              <img
                src={user.profileImage}
                alt={`${user.username}'s profile`}
                className='mr-1 h-8 w-8 rounded text-center'
              />
              <div className='flex flex-col'>
                <h2 className='font-title text-center text-sm'>
                  {user.username}
                </h2>
                <p className='text-[8px] opacity-60'>
                  {user.followerCount} {'followers'}
                </p>
              </div>
            </Link>
            <button
              type='button'
              onClick={() => {
                handleFollowClick(user.id);
              }}
              className={`ml-auto h-6 w-14 cursor-pointer rounded border py-0.5 text-xs ${user.isFollowing ? 'border-rose-600 text-rose-600' : 'border-turquoise-blue-400 text-turquoise-blue-400 bg-transparent'} `}
            >
              {user.isFollowing ? 'unfollow' : 'follow'}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default UserSuggestion;

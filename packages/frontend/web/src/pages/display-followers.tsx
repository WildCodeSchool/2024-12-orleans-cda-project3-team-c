import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import DisplayFollowerItem from '@/components/display-follower-item';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';

export default function DisplayFollowers() {
  const { userId } = useParams();
  const followerId = Number(userId);

  const [viewType, setViewType] = useState<'followers' | 'followees'>(
    'followers',
  );

  useEffect(() => {
    //
  }, []);

  return (
    <div className='md:m-auto md:mt-10 md:max-w-md'>
      <div className='flex items-center gap-16 p-4'>
        <Link to='/profile'>
          <img className='h-8 w-8' src={arrowLeftIcon} alt='arrow left icon' />
        </Link>
        <h1 className='text-center'>{'Subscriptions'}</h1>
      </div>
      <div className='my-4 flex justify-around'>
        <button
          type='button'
          className={viewType === 'followers' ? 'font-bold' : ''}
          onClick={() => {
            setViewType('followers');
          }}
        >
          {'Followers'}
        </button>
        <button
          type='button'
          className={viewType === 'followees' ? 'font-bold' : ''}
          onClick={() => {
            setViewType('followees');
          }}
        >
          {'Following'}
        </button>
      </div>
      <div className='mx-4 flex items-center justify-between'>
        <DisplayFollowerItem followerId={followerId} viewType={viewType} />
      </div>
    </div>
  );
}

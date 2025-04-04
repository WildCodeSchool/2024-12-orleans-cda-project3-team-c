import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import user from '../assets/pictures/users/user.png';

export default function ProfileInformations() {
  return (
    <section className='mt-[9.5rem] flex flex-col items-center'>
      <div className='flex'>
        <Link to='/parameters'>
          <img
            className='size-[2rem]'
            src={arrowLeftIcon}
            alt='arrow left icon'
          />
        </Link>
        <h2 className='font-title ml-[4rem] text-[1.5rem]'>
          {'Profile Informations'}
        </h2>
      </div>
      <img
        className='mt-[2rem] mb-[2rem] size-[4rem] rounded-[4px]'
        src={user}
        alt='user'
      />

      <Link
        className='text-turquoise-blue-400 rounded-[0.25rem] border-[1px] border-[turquoise-blue-400] p-[0.125rem] pr-[0.5rem] pl-[0.5rem] text-[0.75rem]'
        to='/edit-profile'
      >
        <p>{'Edit profile picture'}</p>
      </Link>
      {/* <button className='decoration-turquoise-blue-400 text-[16px] border-turquoise-blue-400'></button> */}
      <div className='mt-[1rem] flex w-[18rem] items-center justify-between rounded-[0.25rem] border-[1px] border-purple-900 p-[0.5rem] pr-[0.5rem] pl-[0.5rem]'>
        <div className='flex flex-col'>
          <p className='text-[0.75rem]'>{'Username'}</p>
          <p className='font-title text-[0.875rem]'>{'@Aang_2006'}</p>
        </div>
        <div className='flex h-6'>
          <Link
            className='text-turquoise-blue-400 flex w-10 items-center justify-center rounded-[0.25rem] border-[1px] border-[turquoise-blue-400] text-[0.75rem]'
            to='/edit-username'
          >
            <p>{'Edit'}</p>
          </Link>
        </div>
      </div>

      <div className='mt-[1rem] flex w-[18rem] items-center justify-between rounded-[0.25rem] border-[1px] border-purple-900 p-[0.5rem] pr-[0.5rem] pl-[0.5rem]'>
        <div className='flex flex-col'>
          <p className='text-[0.75rem]'>{'Bio'}</p>
          <p className='text-[0.875rem]'>
            {'Lorem ipsum dolor sit amet consectetur...'}
          </p>
        </div>
        <div className='flex h-6'>
          <Link
            className='text-turquoise-blue-400 flex w-10 items-center justify-center rounded-[0.25rem] border-[1px] border-[turquoise-blue-400] text-[0.75rem]'
            to='/edit-bio'
          >
            <p>{'Edit'}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import gearIcon from '../assets/icons/gear-white.svg';
import logoutIcon from '../assets/icons/logout-white.svg';
import userIcon from '../assets/icons/user-white.svg';

export default function Parameters() {
  return (
    <section className='mt-[9.5rem] flex flex-col items-center'>
      <div className='flex'>
        <Link to='/profile'>
          <img
            className='size-[2rem]'
            src={arrowLeftIcon}
            alt='arrow left icon'
          />
        </Link>
        <h2 className='font-title ml-[4rem] text-[1.5rem]'>{'Parameters'}</h2>
      </div>
      <ul className='text-none mt-[1rem] h-full list-none flex-col'>
        <li className='h-[3rem] max-w-[fit-content]'>
          <Link
            className='flex flex-row items-center text-center'
            to='/profile-informations'
          >
            <img
              className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem] text-center'
              src={userIcon}
              alt='profile informations icon'
            />
            {'Profile Informations'}
          </Link>
        </li>
        <li className='h-[3rem] max-w-[fit-content]'>
          <Link
            className='flex flex-row items-center text-center'
            to='/account-settings'
          >
            <img
              className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem] text-center'
              src={gearIcon}
              alt='account settings icon'
            />
            {'Account Settings'}
          </Link>
        </li>
        <li className='h-[3rem] max-w-[fit-content]'>
          <Link className='flex flex-row items-center text-center' to='/logout'>
            <img
              className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem] text-center'
              src={logoutIcon}
              alt='logout icon'
            />
            {'Log Out'}
          </Link>
        </li>
      </ul>
    </section>
  );
}

import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import gearIcon from '../assets/icons/gear-white.svg';
import logoutIcon from '../assets/icons/logout-white.svg';
import userIcon from '../assets/icons/user-white.svg';

export default function Parameters() {
  return (
    <section className='item-start mt-4 flex h-full flex-col pl-4 sm:mt-40 sm:items-center sm:pl-0'>
      <div className='flex items-center'>
        <Link to='/profile'>
          <img className='h-8 w-8' src={arrowLeftIcon} alt='arrow left icon' />
        </Link>
        <h2 className='font-title ml-16 text-xl'>{'Parameters'}</h2>
      </div>
      <ul className='mt-4 flex h-full flex-col justify-between pl-4 sm:pl-0'>
        <div>
          <li className='h-12 max-w-fit'>
            <Link
              className='flex flex-row items-center text-center'
              to='/profile-informations'
            >
              <img
                className='mt-2 mr-4 mb-2 h-8 w-8'
                src={userIcon}
                alt='profile informations icon'
              />
              {'Profile Informations'}
            </Link>
          </li>
          <li className='h-12 max-w-fit'>
            <Link
              className='flex flex-row items-center text-center'
              to='/account-settings'
            >
              <img
                className='mt-2 mr-4 mb-2 h-8 w-8'
                src={gearIcon}
                alt='account settings icon'
              />
              {'Account Settings'}
            </Link>
          </li>
        </div>

        <div className='mb-8 flex h-full items-end'>
          <li>
            <Link
              className='flex flex-row items-center text-center'
              to='/logout'
            >
              <img
                className='mr-4 h-8 w-8'
                src={logoutIcon}
                alt='logout icon'
              />
              {'Log Out'}
            </Link>
          </li>
        </div>
      </ul>
    </section>
  );
}

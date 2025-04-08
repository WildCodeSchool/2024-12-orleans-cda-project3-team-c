import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import binIcon from '../assets/icons/bin-red.svg';
import lockIcon from '../assets/icons/lock-white.svg';
import mailIcon from '../assets/icons/mail-white.svg';

export default function AccountSettings() {
  return (
    <section className='item-start mt-4 flex h-full flex-col pl-4 sm:mt-40 sm:items-center sm:pl-0'>
      <div className='flex w-72 items-center'>
        <Link to='/parameters'>
          <img className='h-8 w-8' src={arrowLeftIcon} alt='arrow left icon' />
        </Link>
        <h2 className='font-title ml-16 text-2xl'>{'Account Settings'}</h2>
      </div>

      <ul className='mt-8 flex flex-col gap-4'>
        <li>
          <Link to='/edit-mail' className='flex w-72 items-center text-sm'>
            <img
              className='mr-4 h-8 w-8'
              src={mailIcon}
              alt='change mail icon'
            />
            {'Change mail address'}
          </Link>
        </li>

        <li>
          <Link to='/edit-password' className='flex w-72 items-center text-sm'>
            <img
              className='mr-4 h-8 w-8'
              src={lockIcon}
              alt='change password icon'
            />
            {'Change password'}
          </Link>
        </li>

        <li>
          <Link
            to='/delete-account'
            className='flex w-72 items-center text-sm text-red-600'
          >
            <img
              className='mr-4 h-8 w-8'
              src={binIcon}
              alt='delete account icon'
            />
            {'Delete my account'}
          </Link>
        </li>
      </ul>
    </section>
  );
}

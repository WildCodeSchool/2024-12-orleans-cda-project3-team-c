import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import binIcon from '../assets/icons/bin-red.svg';
import lockIcon from '../assets/icons/lock-white.svg';
import mailIcon from '../assets/icons/mail-white.svg';

export default function AccountSettings() {
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
          {'Account Settings'}
        </h2>
      </div>
      <ul className='text-none mt-[1rem] h-full list-none flex-col'>
        <li className='h-[3rem] max-w-[fit-content]'>
          <Link
            className='flex flex-row items-center text-center'
            to='/change-mail'
            // faire route
          >
            <img
              className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem] text-center'
              src={mailIcon}
              alt='change mail icon'
            />
            {'Change mail address'}
          </Link>
        </li>
        <li className='h-[3rem] max-w-[fit-content]'>
          <Link
            className='flex flex-row items-center text-center'
            to='/change-password'
          >
            {/* faire route */}

            <img
              className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem] text-center'
              src={lockIcon}
              alt='change password icon'
            />
            {'Change password'}
          </Link>
        </li>
        <li className='color-danger h-[3rem] max-w-[fit-content]'>
          <Link
            className='flex flex-row items-center text-center'
            to='/delete-account'
          >
            {/* faire route */}

            <img
              className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem] text-center'
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

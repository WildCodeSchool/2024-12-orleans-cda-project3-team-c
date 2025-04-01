import { Link } from 'react-router-dom';

import addIcon from '../assets/icons/add-white.svg';
import bellIcon from '../assets/icons/bell-white.svg';
import chatIcon from '../assets/icons/chat-white.svg';
import homeIcon from '../assets/icons/home-white.svg';
import searchIcon from '../assets/icons/search-white.svg';
import userIcon from '../assets/icons/user-white.svg';

export default function NavBarLeftWeb() {
  return (
    <section className='h-dvh w-[238px] max-[640px]:hidden'>
      <h1 className='font-title mt-8 mb-8 ml-8 text-[64px] font-bold'>
        {'Mingo'}
      </h1>
      <nav className='mb-2 ml-8 h-[70dvh] border-r-[2px] border-purple-900'>
        <ul className='text-none h-full list-none flex-col justify-center self-end'>
          <li className='h-12 max-w-[fit-content]'>
            <Link className='flex flex-row items-center text-center' to='/'>
              <img
                className='mr-4 size-8 items-center'
                src={homeIcon}
                alt='Home'
              />
              {'Home'}
            </Link>
          </li>
          <li className='h-12 max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/search'>
              <img className='mt-2 mr-4 size-8' src={searchIcon} alt='Search' />
              {'Search'}
            </Link>
          </li>
          <li className='h-12 max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/add'>
              <img
                className='mt-2 mr-4 mb-2 size-8 text-center'
                src={addIcon}
                alt='Add a post'
              />
              {'Add a post'}
            </Link>
          </li>
          <li className='h-12 max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/chat'>
              <img
                className='mt-2 mr-4 mb-2 size-8'
                src={chatIcon}
                alt='Chat'
              />
              {'Chat'}
            </Link>
          </li>
          <li className='h-12 max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/notifications'>
              <img
                className='mt-2 mr-4 mb-2 size-8'
                src={bellIcon}
                alt='Notifications'
              />
              {'Notifications'}
            </Link>
          </li>
          <li className='h-12 max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/profile'>
              <img
                className='mt-2 mr-4 mb-2 size-8'
                src={userIcon}
                alt='Profile'
              />
              {'Profile'}
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}

import { Link } from 'react-router-dom';

import addIcon from '../assets/icons/add-white.svg';
import bellIcon from '../assets/icons/bell-white.svg';
import chatIcon from '../assets/icons/chat-white.svg';
import homeIcon from '../assets/icons/home-white.svg';
import searchIcon from '../assets/icons/search-white.svg';
import userIcon from '../assets/icons/user-white.svg';

export default function NavBarLeftWeb() {
  return (
    <section className='h-full w-[14.875rem] max-[34rem]:hidden'>
      <h1 className='font-title mt-[2rem] mb-[2rem] ml-[2rem] text-[4rem] font-bold'>
        {'Mingo'}
      </h1>
      <nav className='mb-[0.5rem] ml-[2rem] h-dvh border-r-[0.125rem] border-purple-900'>
        <ul className='text-none h-full list-none flex-col justify-center self-end'>
          <li className='h-[3rem] max-w-[fit-content]'>
            <Link className='flex flex-row items-center text-center' to='/'>
              <img
                className='mr-[1rem] size-[2rem] items-center'
                src={homeIcon}
                alt='Home'
              />
              {'Home'}
            </Link>
          </li>
          <li className='h-[3rem] max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/search'>
              <img
                className='mt-[0.5rem] mr-[1rem] size-[2rem]'
                src={searchIcon}
                alt='Search'
              />
              {'Search'}
            </Link>
          </li>
          <li className='h-[3rem] max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/add'>
              <img
                className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem] text-center'
                src={addIcon}
                alt='Add a post'
              />
              {'Add a post'}
            </Link>
          </li>
          <li className='h-[3rem] max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/chat'>
              <img
                className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem]'
                src={chatIcon}
                alt='Chat'
              />
              {'Chat'}
            </Link>
          </li>
          <li className='h-[3rem] max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/notifications'>
              <img
                className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem]'
                src={bellIcon}
                alt='Notifications'
              />
              {'Notifications'}
            </Link>
          </li>
          <li className='h-[3rem] max-w-[fit-content]'>
            <Link className='flex flex-row items-center' to='/profile'>
              <img
                className='mt-[0.5rem] mr-[1rem] mb-[0.5rem] size-[2rem]'
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

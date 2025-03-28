import { Link } from 'react-router-dom';

import add from '../assets/icons/add-white.svg';
import bell from '../assets/icons/bell-white.svg';
import chat from '../assets/icons/chat-white.svg';
import home from '../assets/icons/home-white.svg';
import search from '../assets/icons/search-white.svg';
import user from '../assets/icons/user-white.svg';

export default function NavBar() {
  return (
    <section className='h-dvh w-[238px]'>
      <h1 className='font-title mt-[32px] mb-[32px] ml-[32px] text-[64px] font-bold'>
        {'Mingo'}
      </h1>
      <div className='h-dvh border-r-[2px] border-purple-900'>
        <ul className='text-none h-full list-none flex-col justify-center self-end'>
          <li>
            <Link className='flex flex-row items-center text-center' to='/'>
              <img
                className='mr-[16px] mb-[8px] ml-[32px] size-[32px] items-center'
                src={home}
                alt='Home'
              />
              {'Home'}
            </Link>
          </li>
          <li>
            <Link className='flex flex-row items-center' to='/search'>
              <img
                className='mt-[8px] mr-[16px] mb-[8px] ml-[32px] size-[32px]'
                src={search}
                alt='Search'
              />
              {'Search'}
            </Link>
          </li>
          <li>
            <Link className='flex flex-row items-center' to='/add'>
              <img
                className='mt-[8px] mr-[16px] mb-[8px] ml-[32px] size-[32px] text-center'
                src={add}
                alt='Add a post'
              />
              {'Add a post'}
            </Link>
          </li>
          <li>
            <Link className='flex flex-row items-center' to='/chat'>
              <img
                className='mt-[8px] mr-[16px] mb-[8px] ml-[32px] size-[32px]'
                src={chat}
                alt='Chat'
              />
              {'Chat'}
            </Link>
          </li>
          <li>
            <Link className='flex flex-row items-center' to='/notifications'>
              <img
                className='mt-[8px] mr-[16px] mb-[8px] ml-[32px] size-[32px]'
                src={bell}
                alt='Notifications'
              />
              {'Notifications'}
            </Link>
          </li>
          <li>
            <Link className='flex flex-row items-center' to='/profile'>
              <img
                className='mt-[8px] mr-[16px] mb-[8px] ml-[32px] size-[32px]'
                src={user}
                alt='Profile'
              />
              {'Profile'}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

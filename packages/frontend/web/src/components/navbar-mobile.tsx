import { Link } from 'react-router-dom';

import addIcon from '../assets/icons/add-white.svg';
import chatIcon from '../assets/icons/chat-white.svg';
import homeIcon from '../assets/icons/home-white.svg';
import searchIcon from '../assets/icons/search-white.svg';
import userIcon from '../assets/icons/user-white.svg';

export default function NavBarMobile() {
  return (
    <section className='h-dvh w-dvw sm:hidden'>
      <nav>
        <ul className='fixed bottom-0 mb-[8px] flex w-dvw justify-around'>
          <li>
            <Link to='/'>
              <img className='size-[32px]' src={homeIcon} alt='Home' />
            </Link>
          </li>
          <li>
            <Link to='/search'>
              <img className='size-[32px]' src={searchIcon} alt='Search' />
            </Link>
          </li>
          <li>
            <Link to='/add'>
              <img className='size-[32px]' src={addIcon} alt='Add a post' />
            </Link>
          </li>
          <li>
            <Link to='/chat'>
              <img className='size-[32px]' src={chatIcon} alt='Chat' />
            </Link>
          </li>
          <li>
            <Link to='/profile'>
              <img className='size-[32px]' src={userIcon} alt='Profile' />
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}

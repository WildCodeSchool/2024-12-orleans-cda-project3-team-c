import { Link } from 'react-router-dom';

import addIcon from '../assets/icons/add-white.svg';
import chatIcon from '../assets/icons/chat-white.svg';
import homeIcon from '../assets/icons/home-white.svg';
import searchIcon from '../assets/icons/search-white.svg';
import userIcon from '../assets/icons/user-white.svg';

export default function NavBarMobile() {
  return (
    <nav className='fixed bottom-0 h-[65px] w-dvw sm:hidden'>
      <ul className='relative flex w-dvw justify-around pt-4 pb-4 after:absolute after:top-0 after:left-[10%] after:w-[80%] after:border-t'>
        <li>
          <Link to='/' aria-label='Accueil'>
            <img className='size-8' src={homeIcon} alt='' aria-hidden='true' />
          </Link>
        </li>
        <li>
          <Link to='/search' aria-label='Recherche'>
            <img
              className='size-8'
              src={searchIcon}
              alt=''
              aria-hidden='true'
            />
          </Link>
        </li>
        <li>
          <Link to='/add' aria-label='Ajouter un post'>
            <img className='size-8' src={addIcon} alt='' aria-hidden='true' />
          </Link>
        </li>
        <li>
          <Link to='/chat' aria-label='Messages'>
            <img className='size-8' src={chatIcon} alt='' aria-hidden='true' />
          </Link>
        </li>
        <li>
          <Link to='/profile' aria-label='Profil'>
            <img className='size-8' src={userIcon} alt='' aria-hidden='true' />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useLoginContext } from '@/contexts/auth-context';

import addIcon from '../assets/icons/add-white.svg';
import bellIcon from '../assets/icons/bell-white.svg';
import homeIcon from '../assets/icons/home-white.svg';
import searchIcon from '../assets/icons/search-white.svg';

type NavItemProps = {
  readonly to: string;
  readonly icon: string;
  readonly label: string;
};

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <li className='h-12 max-w-fit'>
      <Link className='flex flex-row items-center' to={to} aria-label={label}>
        <img
          className={`mr-4 size-8 ${to === '/profile' ? 'rounded' : ''}`}
          src={icon}
          alt=''
          aria-hidden='true'
        />
        <span className='hidden sm:inline'>{label}</span>
      </Link>
    </li>
  );
}

export default function NavBar() {
  const context = useLoginContext();
  const location = useLocation();
  let user;
  if (context !== undefined) {
    user = context.user;
  }

  useEffect(() => {
    if (location.pathname === '/feed') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location]);

  const navItems: NavItemProps[] = [
    { to: '/feed', icon: homeIcon, label: 'Home' },
    { to: '/search', icon: searchIcon, label: 'Search' },
    { to: '/create', icon: addIcon, label: 'Create a post' },
    {
      to: '/profile',
      icon: `/cdn/pictures/users/${user?.profile_picture}`,
      label: 'Profile',
    },
  ];
  return (
    <>
      <nav className='fixed top-0 z-5 hidden h-dvh w-56 bg-purple-950 pt-8 pl-8 md:block'>
        <Link
          to='/'
          title='Home'
          className='font-title mb-8 block text-6xl font-bold'
        >
          {'Mingo'}
        </Link>
        <ul className='flex h-[70dvh] list-none flex-col space-y-2 border-r-2 border-purple-900'>
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </ul>
      </nav>

      <nav className='fixed bottom-0 z-5 h-16 bg-purple-950 md:hidden'>
        <ul className='relative flex w-dvw justify-around pt-4 pb-4 after:absolute after:top-0 after:w-[80%] after:border-t'>
          {navItems
            .filter((item) => item.label !== 'Notifications')
            .map((item) => (
              <li key={item.to}>
                <Link to={item.to} aria-label={item.label}>
                  <img
                    className={`size-8 ${item.to === '/profile' ? 'rounded' : ''}`}
                    src={item.icon}
                    alt=''
                    aria-hidden='true'
                  />
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}

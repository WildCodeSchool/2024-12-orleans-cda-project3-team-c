import { Link } from 'react-router-dom';

import useShowPassword from '@/hooks/use-show-password';

import hiden from '../assets/icons/hide-white.svg';
import show from '../assets/icons/show-white.svg';
import Button from './button';
import Logo from './logo';

export default function LoginComp() {
  const [isVisible, toggleVisible] = useShowPassword() as [boolean, () => void];

  return (
    <div className='flex flex-col items-center md:grid md:h-screen md:grid-cols-[60%_40%]'>
      <Logo />
      <div className='flex w-11/12 flex-col items-center justify-center rounded-sm bg-white px-2 py-4 md:h-full md:w-full'>
        <form
          action=''
          className='flex w-full flex-col gap-y-4 rounded-sm border md:w-8/12 md:text-center'
        >
          <h1 className='font-title text-center text-2xl font-semibold text-indigo-950'>
            {'Log in'}
          </h1>
          <input
            type='text'
            placeholder='email or username'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
          />
          <div className='relative'>
            <input
              type={isVisible ? 'Text' : 'Password'}
              placeholder='password'
              className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
            />

            <div
              className='absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 cursor-pointer'
              onClick={toggleVisible}
            >
              {isVisible ? (
                <img src={hiden} alt='eye hide' />
              ) : (
                <img src={show} alt='eye show' />
              )}
            </div>
          </div>
          <p className='text-end text-xs text-rose-600 underline'>
            {' '}
            <Link to={'/forgotten'}>{'forgot my password? '}</Link>
          </p>

          <Button title={'Log in'} />

          <p className='text-xs text-black'>
            {"Don't have an account? "}
            <Link to={'/inscription'} className='text-rose-600'>
              {'Sign up.'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

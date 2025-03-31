import { Link } from 'react-router-dom';

import useShowPassword from '@/hooks/use-show-password';

import hiden from '../assets/icons/hide-white.svg';
import show from '../assets/icons/show-white.svg';
import Button from './button';
import Logo from './logo';

export default function SignupComp() {
  const [isVisible, toggleVisible] = useShowPassword() as [boolean, () => void];

  return (
    <div className='flex flex-col items-center md:grid md:h-screen md:grid-cols-[60%_40%]'>
      <Logo />
      <div className='flex w-11/12 flex-col items-center justify-center rounded-sm bg-white px-2 py-4 md:h-full md:w-full'>
        <form
          action=''
          className='flex w-full flex-col gap-y-4 rounded-sm border md:w-8/12 md:text-center'
        >
          <h1 className='text-dark font-title text-center text-2xl font-semibold text-indigo-950'>
            {'Sign up'}
          </h1>
          <input
            type='text'
            placeholder='email'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
          />
          <input
            type='text'
            placeholder='username'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
          />
          <div className='relative'>
            <input
              type={isVisible ? 'text' : 'password'}
              placeholder='password'
              className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
            />

            <div
              className='absolute top-1/2 right-5 flex h-5 w-5 -translate-y-1/2 cursor-pointer'
              onClick={toggleVisible}
            >
              {isVisible ? (
                <img src={hiden} alt='eye hide' />
              ) : (
                <img src={show} alt='eye show' />
              )}
            </div>
          </div>
          <input
            type={isVisible ? 'text' : 'password'}
            placeholder='password'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
          />

          <Button title={'Sign up'} />

          <p className='text-xs text-[#000000]'>
            {'Already have an account ? '}
            <Link to={'/connexion'} className='text-rose-600'>
              {' Log in.'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

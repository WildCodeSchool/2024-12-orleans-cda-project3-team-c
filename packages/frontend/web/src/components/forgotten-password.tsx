import { Link } from 'react-router-dom';

import Button from './button';
import Logo from './logo';

export default function ForgottenPassword() {
  return (
    <div className='flex flex-col items-center md:grid md:h-screen md:grid-cols-[60%_40%]'>
      <Logo />
      <div className='flex w-11/12 flex-col items-center justify-center rounded-sm bg-white px-2 py-4 md:h-full md:w-full'>
        <form
          action=''
          className='flex w-full flex-col gap-y-4 rounded-sm border md:w-8/12 md:text-center'
        >
          <h1 className='font-title text-center text-2xl font-semibold text-indigo-950'>
            {'Forgotten password?'}
          </h1>
          <p className='text-center text-sm text-black'>
            {'Enter the mail address used for your account'}
          </p>
          <input
            type='text'
            placeholder='email'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white focus:outline-offset-0'
          />

          <Button title={'Send'} />

          <p className='text-xs text-black'>
            {'Go to log in.'}
            <Link to={'/login'} className='text-rose-600'>
              {'Log in.'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

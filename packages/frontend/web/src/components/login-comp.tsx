import { Link } from 'react-router-dom';

import Logo from './logo';

export default function LoginComp() {
  return (
    <div className='flex flex-col items-center'>
      <Logo />
      <div className='flex w-full flex-col items-center justify-center'>
        <form
          action=''
          className='flex w-11/12 flex-col gap-y-4 rounded-sm border bg-white px-2 py-4'
        >
          <h1 className='text-dark font-title text-center text-2xl text-indigo-950'>
            {'Log in'}
          </h1>
          <input
            type='text'
            placeholder='email or username'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white'
          />
          <input
            type='password'
            placeholder='password'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white'
          />
          <p className='text-end text-xs text-[#FC007A] underline'>
            {' '}
            <Link to={'#'}>{'forgot my password  '}</Link>
          </p>
          <button
            type='submit'
            className='m-auto w-16 rounded-sm border px-2 py-1 text-xs text-indigo-950'
          >
            {'Log in'}
          </button>

          <p className='text-xs text-gray-500'>
            {"Don't have an account? "}
            <Link to={'#'} className='text-[#fc007a]'>
              {'Sign up.'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

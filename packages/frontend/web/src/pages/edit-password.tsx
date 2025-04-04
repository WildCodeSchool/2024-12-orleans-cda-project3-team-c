import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import showIcon from '../assets/icons/show-white.svg';

export default function EditPassword() {
  return (
    <>
      <section className='mt-40 flex flex-col items-center'>
        <div className='flex items-center'>
          <Link to='/account-settings'>
            <img
              className='h-8 w-8'
              src={arrowLeftIcon}
              alt='arrow left icon'
            />
          </Link>
          <h2 className='font-title ml-16 text-xl'>{'Password'}</h2>
        </div>
      </section>

      <section className='flex flex-col items-center'>
        <div className='mt-12 flex w-72'>
          <form action='POST'>
            <div className='mb-4 flex w-72 justify-between rounded-md border border-gray-300 bg-purple-900 p-2'>
              <input
                type='text'
                placeholder='New password'
                className='w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none'
              />
              <button type='button'>
                <img
                  className='h-4 w-4'
                  src={showIcon}
                  alt='show password icon'
                />
              </button>
            </div>

            <input
              className='w-72 rounded-md border border-gray-300 bg-purple-900 p-2 text-xs text-white placeholder-gray-400 focus:outline-none'
              type='text'
              placeholder='Confirm new password'
            />

            <div className='mt-4 flex w-72 justify-between rounded-md border border-gray-300 bg-purple-900 p-2'>
              <input
                type='text'
                placeholder='Actual password'
                className='w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none'
              />
              <button type='button'>
                <img
                  className='h-4 w-4'
                  src={showIcon}
                  alt='show password icon'
                />
              </button>
            </div>
            <div className='mt-1 flex justify-end'>
              <a className='text-turquoise-blue-400 text-xs underline' href='#'>
                {'forgot my password'}
              </a>
            </div>
            <label className='mt-2 flex items-center gap-2 text-sm text-white'>
              <input type='checkbox' />
              {'Log me out of all devices'}
            </label>
          </form>
        </div>
      </section>

      <div className='mt-8 flex h-6 justify-center'>
        <p className='text-turquoise-blue-400 border-turquoise-blue-400 flex w-10 items-center justify-center rounded-md border text-xs'>
          {'Save'}
        </p>
      </div>
    </>
  );
}

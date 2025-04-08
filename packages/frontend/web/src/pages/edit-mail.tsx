import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import showIcon from '../assets/icons/show-white.svg';

export default function EditMail() {
  return (
    <>
      <section className='mt-4 flex flex-col items-start pl-4 sm:mt-40 sm:items-center sm:pl-0'>
        <div className='flex w-72 items-center'>
          <Link to='/account-settings'>
            <img
              className='h-8 w-8'
              src={arrowLeftIcon}
              alt='arrow left icon'
            />
          </Link>
          <h2 className='font-title ml-16 text-2xl'>{'Mail address'}</h2>
        </div>
      </section>

      <section className='flex flex-col items-start pl-4 sm:items-center sm:pl-0'>
        <div className='mt-12 flex w-72'>
          <form action='POST'>
            <input
              className='w-72 rounded-md border border-gray-300 bg-purple-900 p-2 text-xs leading-tight placeholder-gray-500 placeholder-white focus:border-blue-500 focus:outline-none'
              type='text'
              placeholder='firstname@mail.com'
            />
            <div className='mt-4 flex w-72 justify-between rounded-md border border-gray-300 bg-purple-900 p-2'>
              <input
                type='text'
                placeholder='Password'
                className='w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none'
              />
              <button>
                <img
                  className='h-4 w-4'
                  src={showIcon}
                  alt='show password icon'
                />
              </button>
            </div>
            <label className='mt-2 flex items-center gap-2 text-sm text-white'>
              <input type='checkbox' />
              {'Log me out of all devices'}
            </label>
          </form>
        </div>
      </section>

      <div className='mt-8 flex h-6 w-72 justify-center pl-4 sm:w-full sm:pl-0'>
        <p className='text-turquoise-blue-400 border-turquoise-blue-400 flex w-10 items-center justify-center rounded-md border text-xs'>
          {'Save'}
        </p>
      </div>
    </>
  );
}

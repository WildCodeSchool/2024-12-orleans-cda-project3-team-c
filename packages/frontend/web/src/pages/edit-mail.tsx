import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import showIcon from '../assets/icons/show-white.svg';

export default function EditMail() {
  return (
    <>
      <section className='mt-[9.5rem] flex flex-col items-center'>
        <div className='flex'>
          <Link to='/account-settings'>
            <img
              className='size-[2rem]'
              src={arrowLeftIcon}
              alt='arrow left icon'
            />
          </Link>
          <h2 className='font-title ml-[4rem] text-[1.5rem]'>
            {'Mail address'}
          </h2>
        </div>
      </section>

      <section className='flex h-auto flex-col items-center'>
        <div className='mt-12 flex h-auto w-[18rem]'>
          <form action='POST'>
            <input
              className='w-[18rem] flex-1 rounded-[0.25rem] border border-gray-300 bg-purple-900 p-1 text-2xl text-[0.75rem] leading-tight placeholder-gray-500 placeholder-white focus:border-blue-500 focus:outline-none'
              type='text'
              placeholder='firstname@mail.com'
            />
            <div className='mt-4 flex w-[18rem] flex-1 justify-between rounded-[0.25rem] border border-gray-300 bg-purple-900 p-1 text-2xl text-[0.75rem] leading-tight placeholder-gray-500 focus:border-blue-500 focus:outline-none'>
              <input type='text' placeholder='Password' />
              <button>
                <img className='size-4' src={showIcon} alt='arrow left icon' />
              </button>
            </div>
            <label className='mt-2 flex items-center gap-2 text-sm text-white'>
              <input type='checkbox' />
              {'Log me out of all devices'}
            </label>
          </form>
        </div>
      </section>
      <div className='mt-8 flex h-6 justify-center'>
        <p className='text-turquoise-blue-400 flex w-10 items-center justify-center rounded-[0.25rem] border-[1px] border-[turquoise-blue-400] text-[0.75rem]'>
          {'Save'}
        </p>
      </div>
    </>
  );
}

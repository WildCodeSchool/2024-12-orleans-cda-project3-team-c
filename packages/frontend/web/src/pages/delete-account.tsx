import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import showIcon from '../assets/icons/show-white.svg';
import warningIcon from '../assets/icons/warning-red.svg';

export default function DeleteAccount() {
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
          <h2 className='font-title ml-16 text-xl'>{'Delete my account'}</h2>
        </div>
      </section>

      <section className='mt-8 flex flex-col items-center'>
        <img className='mb-4 h-16 w-16' src={warningIcon} alt='warning icon' />
        <p className='w-72 text-justify text-sm leading-5'>
          {
            'Lorem ipsum dolor sit amet consectetur. Sem convallis lectus interdum nulla. Ut platea egestas viverra fringilla. Placerat pharetra vitae sodales ac odio cras. Neque nisi enim ut faucibus.'
          }
        </p>

        <form action='POST' className='mt-8 w-72'>
          <div className='flex items-center justify-between rounded-md border border-gray-300 bg-purple-900 px-2 py-1'>
            <input
              type='password'
              placeholder='Password'
              className='w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none'
            />
            <button type='button'>
              <img
                className='ml-2 h-4 w-4'
                src={showIcon}
                alt='show password icon'
              />
            </button>
          </div>
        </form>

        <button className='mt-8 w-34 rounded-md border border-red-600 py-2 text-sm text-red-600'>
          {'Delete my account'}
        </button>
      </section>
    </>
  );
}

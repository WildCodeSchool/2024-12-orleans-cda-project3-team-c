import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import showIcon from '../assets/icons/show-white.svg';
import warningIcon from '../assets/icons/warning-red.svg';

export default function DeleteAccount() {
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
            {'Delete my account'}
          </h2>
        </div>
      </section>

      <section className='flex h-auto flex-col items-center'>
        <img
          className='mt-12 mb-4 size-16'
          src={warningIcon}
          aria-label='warning image'
        />
        <p className='w-[18rem] text-justify'>
          {
            'Lorem ipsum dolor sit amet consectetur. Sem convallis lectus interdum'
          }
          {
            'nulla. Ut platea egestas viverra fringilla. Placerat pharetra vitae'
          }
          {'sodales ac odio cras. Neque nisi enim ut faucibus.'}
        </p>
        <div className='mt-8 flex h-auto w-[18rem]'>
          <form action='POST'>
            <div className='mb-4 flex w-[18rem] flex-1 justify-between rounded-[0.25rem] border border-gray-300 bg-purple-900 p-1 text-2xl text-[0.75rem] leading-tight placeholder-gray-500 focus:border-blue-500 focus:outline-none'>
              <input type='text' placeholder='Password' />
              <button>
                <img className='size-4' src={showIcon} alt='arrow left icon' />
              </button>
            </div>
          </form>
        </div>
      </section>
      <div className='flex h-6 justify-center'>
        <p className='text-danger flex w-32 items-center justify-center rounded-[0.25rem] border-[1px] border-[turquoise-blue-400] text-[0.75rem]'>
          {'Delete my account'}
        </p>
      </div>
    </>
  );
}

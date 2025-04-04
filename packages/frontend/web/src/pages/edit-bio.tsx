import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';
import searchIcon from '../assets/icons/search-white.svg';

export default function EditBio() {
  return (
    <>
      <section className='mt-[9.5rem] flex flex-col items-center'>
        <div className='flex'>
          <Link to='/profile-informations'>
            <img
              className='size-[2rem]'
              src={arrowLeftIcon}
              alt='arrow left icon'
            />
          </Link>
          <h2 className='font-title ml-[4rem] text-[1.5rem]'>{'Biography'}</h2>
        </div>
      </section>

      <section className='flex flex-col items-center'>
        <div className='mt-6 flex w-[18rem] justify-end p-0'>
          <p className='text-placeholder text-xs'>{'138/150'}</p>
        </div>
        <div className='mt-1 flex w-[18rem] items-center rounded-[0.25rem] border border-gray-300 bg-purple-900 p-1'>
          <textarea
            className='h-[5rem] flex-1 bg-purple-900 px-2 py-1 text-[0.75rem] leading-tight placeholder-gray-500 focus:border-blue-500 focus:outline-none'
            defaultValue='Lorem ipsum dolor sit amet consectetur. Sem convallis lectus interdum nulla. Ut platea egestas viverra fringilla. Placerat pharetra vitae.'
          />
        </div>
      </section>
      <div className='m-6 flex h-6 justify-center'>
        <p className='text-turquoise-blue-400 flex w-10 items-center justify-center rounded-[0.25rem] border-[1px] border-[turquoise-blue-400] text-[0.75rem]'>
          {'Save'}
        </p>
      </div>
    </>
  );
}

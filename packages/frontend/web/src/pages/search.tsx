import { Link } from 'react-router-dom';

import searchIcon from '../assets/icons/search-white.svg';

export default function Search() {
  return (
    <section className='mt-[9.5rem] flex flex-col items-center'>
      <h2 className='font-title mb-[2rem] text-[1.5rem]'>
        {'Search for user or subject'}
      </h2>
      <div className='flex w-[2rem] w-[18rem] items-center justify-between rounded-[0.25rem] border-[1px] bg-purple-900 p-[0.125rem] pr-[0.5rem] pl-[0.5rem]'>
        <p className='text-placeholder text-[0.75rem]'>{'Search'}</p>
        <img className='size-[1rem]' src={searchIcon} alt='search icon' />
      </div>
    </section>
  );
}

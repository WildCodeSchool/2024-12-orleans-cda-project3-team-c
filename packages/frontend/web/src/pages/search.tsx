import { Link } from 'react-router-dom';

import searchIcon from '../assets/icons/search-white.svg';

export default function Search() {
  return (
    <section className='mt-[9.5rem] flex flex-col items-center'>
      <h2 className='font-title mb-[2rem] text-[1.5rem]'>
        {'Search for user or subject'}
      </h2>
      <div className='flex w-[18rem] items-center rounded-[0.25rem] border border-gray-300 bg-purple-900 p-[0.125rem] pr-[0.5rem]'>
        <input
          className='flex-1 bg-transparent px-2 py-1 text-[0.75rem] placeholder-gray-500 focus:border-blue-500 focus:outline-none'
          type='text'
          placeholder='Search'
        />
        <Link to='/search-results'>
          <img
            className='ml-2 size-[1rem]'
            src={searchIcon}
            alt='search icon'
          />
        </Link>
      </div>
    </section>
  );
}

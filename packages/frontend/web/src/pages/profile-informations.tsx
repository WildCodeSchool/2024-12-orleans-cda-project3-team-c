import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';

export default function ProfileInformations() {
  return (
    <section className='mt-[9.5rem] flex flex-col items-center'>
      <div className='flex'>
        <Link to='/parameters'>
          <img
            className='size-[2rem]'
            src={arrowLeftIcon}
            alt='arrow left icon'
          />
        </Link>
        <h2 className='font-title ml-[4rem] text-[1.5rem]'>
          {'Profile Informations'}
        </h2>
      </div>
    </section>
  );
}

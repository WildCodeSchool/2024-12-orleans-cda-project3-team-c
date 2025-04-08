import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';

{
  /* RAJOUTER LE FORM POUR L'INPUT*/
}

export default function EditUsername() {
  return (
    <>
      <section className='item-start mt-4 flex flex-col pl-4 sm:mt-40 sm:items-center sm:pl-0'>
        <div className='flex w-72 items-center'>
          <Link to='/profile-informations'>
            <img
              className='h-8 w-8'
              src={arrowLeftIcon}
              alt='arrow left icon'
            />
          </Link>
          <h2 className='font-title ml-16 text-2xl'>{'Username'}</h2>
        </div>
      </section>

      <section className='flex flex-col items-start pl-4 sm:items-center sm:pl-0'>
        <div className='mt-6 flex w-72 justify-end p-0'>
          {/* calculer le nombre de caracteres */}
          <p className='text-placeholder text-xs'>{'10/30'}</p>
        </div>
        <div className='mt-1 flex h-6 w-72 items-center rounded-md border border-gray-300 bg-purple-900 p-2'>
          {/* dans le placeholder: selectionner le nom de l'utilisateur actuel */}
          <input
            className='flex-1 bg-purple-900 text-xs text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none'
            type='text'
            placeholder='@Aang_2006'
          />
        </div>
      </section>

      <div className='mt-8 flex h-6 w-72 justify-center pl-4 sm:w-full sm:pl-0'>
        {/* update le nom de l'utilisateur actuel du input */}
        <p className='text-turquoise-blue-400 border-turquoise-blue-400 flex w-10 items-center justify-center rounded-md border text-xs'>
          {'Save'}
        </p>
      </div>
    </>
  );
}

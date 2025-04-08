import { Link } from 'react-router-dom';

import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';

{
  /* METTRE UN FORM ET UN INPUT POUR LA BIO */
}

export default function EditBio() {
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
          <h2 className='font-title ml-16 text-xl'>{'Biography'}</h2>
        </div>
      </section>

      <section className='flex flex-col items-start pl-4 sm:items-center sm:pl-0'>
        <div className='mt-6 flex w-72 justify-end'>
          {/* calculer le nombre de caracteres */}
          <p className='text-placeholder text-xs'>{'138/150'}</p>
        </div>

        <div className='mt-1 flex w-72 items-center rounded-md border border-gray-300 bg-purple-900 p-1'>
          {/* selectionner la bio dans l'input textarea de l'utilisateur actuel */}
          {/* update la bio de l'utilisateur actuel */}
          <textarea
            className='h-20 flex-1 bg-purple-900 px-2 py-1 text-xs leading-tight text-white placeholder-gray-500 focus:outline-none'
            defaultValue='Lorem ipsum dolor sit amet consectetur. Sem convallis lectus interdum nulla. Ut platea egestas viverra fringilla. Placerat pharetra vitae.'
          />
        </div>
      </section>

      <div className='mt-8 flex h-6 w-72 justify-center pl-4 sm:w-full sm:pl-0'>
        <p className='border-turquoise-blue-400 text-turquoise-blue-400 flex w-10 items-center justify-center rounded-md border text-xs'>
          {'Save'}
        </p>
      </div>
    </>
  );
}

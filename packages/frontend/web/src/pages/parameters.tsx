import arrowLeftIcon from '../assets/icons/arrow-left-white.svg';

export default function Parameters() {
  return (
    <section className='flex flex-col'>
      <div className='flex'>
        <img
          className='size-[32px]'
          src={arrowLeftIcon}
          alt='arrow left icon'
        />
        <h2 className='text-[24px]'>{'Parameters'}</h2>
      </div>
      <section className='flex flex-col' />
    </section>
  );
}

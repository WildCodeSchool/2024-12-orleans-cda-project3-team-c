import backIcon from '../assets/icons/arrow-left-white.svg';

export default function PostComments({
  displayCommentsModal,
}: {
  readonly displayCommentsModal: (isVisible: boolean) => void;
}) {
  return (
    // h-[calc(100dvh-(--spacing(16)))]
    <section
      className={`border-danger fixed bottom-0 left-0 z-10 h-dvh w-dvw border-2 bg-purple-950`}
    >
      <header className='mb-16 p-4'>
        <button
          type='button'
          className='font-title relative block h-8 w-full text-center text-base md:text-2xl'
          onClick={() => {
            displayCommentsModal(false);
          }}
        >
          <img
            src={backIcon}
            aria-hidden='true'
            alt=''
            className='absolute top-0 left-0 w-8'
          />
          {'Comments'}
        </button>
      </header>
      <div className='comments-section' />
      <div className='user-input-section' />
    </section>
  );
}

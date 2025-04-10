import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import postApiConnection from '@/api-connection/post-api-connection';

import addPictureIcon from '../assets/icons/add-picture-white.svg';
import backIcon from '../assets/icons/arrow-left-white.svg';

export default function CreatePostPage() {
  const [step, setStep] = useState(1);
  const [picturePath, setPicturePath] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSelectPicture = (event: React.ChangeEvent) => {
    const pictureFile = (event.target as HTMLInputElement).files?.[0];
    if (pictureFile) {
      setPicturePath(URL.createObjectURL(pictureFile));
      setStep(2);
    }
  };

  const resetPicture = () => {
    setPicturePath(undefined);
    setStep(1);
  };

  const resetDescription = () => {
    setDescription('');
    setStep(2);
  };

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const postData = new FormData(event.target as HTMLFormElement);

    try {
      const isPosted = await postApiConnection.create(postData);
      if (isPosted) {
        await navigate('/feed');
      } else {
        throw new Error('Error while posting -- front end -- create post page');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='mx-auto w-full max-w-[460px] p-2'>
      <header className='mb-16 p-4'>
        <Link
          className='font-title relative block h-8 w-full text-center text-base'
          to={'a faire plus tard avec le state machin là fais moi confiance'}
        >
          <img
            src={backIcon}
            aria-hidden='true'
            alt=''
            className='absolute top-0 left-0 w-8'
          />
          {'New post'}
        </Link>
      </header>

      {/* form */}
      <form
        encType='multipart/form-data'
        onSubmit={async (event) => {
          await handleSubmitForm(event);
        }}
      >
        <input
          type='file'
          name='picture'
          id='picture-input'
          onChange={(event) => {
            handleSelectPicture(event);
          }}
          className='hidden'
        />
        {/* form page 1 - choosing a picture */}
        {step === 1 && (
          <label
            className='flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white'
            htmlFor='picture-input'
          >
            <img src={addPictureIcon} alt='' className='w-8' />
            <span>{'Choose your picture'}</span>
          </label>
        )}

        {/* form page 2 - croping picture */}
        {step === 2 && (
          <>
            <img
              src={picturePath}
              alt='Post picture preview'
              className='mb-8'
            />

            <div className='flex justify-around'>
              <button
                title='Next step'
                type='button'
                className='border-danger text-danger text-title rounded border px-2 py-0.5 text-xs'
                onClick={() => {
                  resetPicture();
                }}
              >
                {'Back'}
              </button>
              <button
                title='Next step'
                type='button'
                className='border-turquoise-blue-400 text-turquoise-blue-400 text-title rounded border px-2 py-0.5 text-xs'
                onClick={() => {
                  setStep(3);
                }}
              >
                {'Next'}
              </button>
            </div>
          </>
        )}

        {/* form page 3 - adding description */}
        {step === 3 && (
          <>
            <img
              src={picturePath}
              alt='Post picture preview'
              className='mx-auto mb-6 max-w-32'
            />

            <textarea
              name='description'
              className='border-placeholder mb-8 h-16 w-full resize-none border-b'
              id=''
              placeholder='Add a description'
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />

            <div className='flex justify-around'>
              <button
                title='Next step'
                type='button'
                className='border-danger text-danger text-title rounded border px-2 py-0.5 text-xs'
                onClick={() => {
                  resetDescription();
                }}
              >
                {'Back'}
              </button>
              <button
                title='Next step'
                type='submit'
                className='border-turquoise-blue-400 text-turquoise-blue-400 text-title rounded border px-2 py-0.5 text-xs'
              >
                {'Post'}
              </button>
            </div>
          </>
        )}

        {/* form page 4 - validation */}
        {/* <button type='submit'>submit</button> */}
      </form>
    </section>
  );
}

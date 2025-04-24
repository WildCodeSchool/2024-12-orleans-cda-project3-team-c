import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import postApiConnection from '@/api-connection/post-api-connection';

import addPictureIcon from '../assets/icons/add-picture-white.svg';
import backIcon from '../assets/icons/arrow-left-white.svg';

export default function CreatePostPage() {
  const [step, setStep] = useState(1);
  const [picturePath, setPicturePath] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    <section className='relative mx-auto w-full max-w-[460px] p-2'>
      {isModalVisible ? (
        <GoBackModal setIsModalVisible={setIsModalVisible} />
      ) : null}
      <header className='mb-16 p-4'>
        <button
          type='button'
          className='font-title relative block h-8 w-full text-center text-base md:text-2xl'
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          <img
            src={backIcon}
            aria-hidden='true'
            alt=''
            className='absolute top-0 left-0 w-8'
          />
          {'New post'}
        </button>
      </header>

      {/* form */}
      <form encType='multipart/form-data' onSubmit={handleSubmitForm}>
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
          <div className='md:flex md:gap-8'>
            <img
              src={picturePath}
              alt='Post picture preview'
              className='mx-auto mb-6 max-w-32'
            />

            <div className='md:flex-2'>
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
            </div>
          </div>
        )}
      </form>
    </section>
  );
}

function GoBackModal({
  setIsModalVisible,
}: {
  readonly setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  return (
    <div className='border-danger absolute top-40 left-1/2 w-4/5 -translate-1/2 rounded border bg-purple-900 p-2 text-center shadow-lg'>
      <p className='mb-4'>
        {'Your modifications will be lost if you leave this page'}
      </p>
      <div className='flex justify-around'>
        <button
          title='Next step'
          type='button'
          className='border-danger text-danger text-title rounded border px-2 py-0.5 text-xs'
          onClick={async () => {
            await navigate(-1);
          }}
        >
          {'Leave'}
        </button>
        <button
          title='Next step'
          type='button'
          className='border-turquoise-blue-400 text-turquoise-blue-400 text-title rounded border px-2 py-0.5 text-xs'
          onClick={() => {
            setIsModalVisible(false);
          }}
        >
          {'Cancel'}
        </button>
      </div>
    </div>
  );
}

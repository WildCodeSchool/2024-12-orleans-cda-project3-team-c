import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import loginApiConnection from '@/api-connection/login-api-connection';
import Button from '@/components/button';
import Logo from '@/components/logo';
import { useLoginContext } from '@/contexts/auth-context';
import useDisclosure from '@/hooks/use-disclosure';

import hiddenPassword from '../assets/icons/hide-white.svg';
import show from '../assets/icons/show-white.svg';

export default function Login() {
  const [isTrue, toggleTrue] = useDisclosure();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const userLogged = useLoginContext();

  const navigate = useNavigate();

  const isUserLogged = userLogged?.isUserLogged;
  const isLoading = userLogged?.isLoading;

  if (isLoading === true) {
    return;
  }

  if (isUserLogged === true) {
    return <Navigate to={'/'} />;
  }

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (!credential.length || !password.length) {
      setErrorMessage('All inputs are required');
      return;
    }

    const loginData = await loginApiConnection.login(credential, password);

    if (loginData.ok) {
      userLogged?.setIsUserLogged(true);
      userLogged?.setUser(loginData.user);
      await navigate('/feed');
    } else {
      setErrorMessage(loginData.message);
    }
  };

  return (
    <div className='flex flex-col items-center md:grid md:h-screen md:grid-cols-[60%_40%]'>
      <Logo />
      <div className='flex w-11/12 flex-col items-center justify-center rounded-sm bg-white px-2 py-4 md:h-full md:w-full'>
        <form
          onSubmit={login}
          action=''
          className='flex w-full flex-col gap-y-4 rounded-sm border md:w-8/12 md:text-center'
        >
          <h1 className='font-title text-center text-2xl font-semibold text-indigo-950'>
            {'Log in'}
          </h1>

          <label htmlFor='credential' className='hidden'>
            {'Email or username'}
          </label>
          <input
            type='text'
            value={credential}
            onChange={(event) => {
              setCredential(event.target.value);
            }}
            placeholder='Email or username'
            id='credential'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
          />

          <div className='relative'>
            <label htmlFor='password' className='hidden'>
              {'Password'}
            </label>
            <input
              type={isTrue ? 'text' : 'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder='password'
              className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
            />

            <button
              type='button'
              aria-label={`${isTrue ? 'Hide' : 'Show'} password`}
              title={`${isTrue ? 'Hide' : 'Show'} password`}
              className='absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 cursor-pointer'
              onClick={toggleTrue}
            >
              {isTrue ? (
                <img src={hiddenPassword} alt='' aria-hidden />
              ) : (
                <img src={show} alt='' aria-hidden />
              )}
            </button>
          </div>
          <p className='text-end text-xs text-rose-600 underline'>
            <Link to={'/forgotten-password'}>{'forgot my password'}</Link>
          </p>

          <p className='text-danger text-center text-xs'>{errorMessage}</p>

          <Button title={'Log in'} />

          <p className='text-xs text-black'>
            {"Don't have an account? "}
            <Link
              to={'/register'}
              className='text-rose-600'
              title='Create an account'
            >
              {'Sign up.'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

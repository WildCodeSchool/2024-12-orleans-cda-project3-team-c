import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import RegisterApiConnection from '@/api-connection/register-api-connection';
import useDisclosure from '@/hooks/use-disclosure';

import hiddenPassword from '../assets/icons/hide-white.svg';
import show from '../assets/icons/show-white.svg';
import Button from './button';
import Logo from './logo';

export default function Register() {
  const [isTrue, toggleTrue] = useDisclosure();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessages, setErrorMessages] = useState<{
    email?: string;
    username?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();

  const userRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessages({});

    const newErrorMessages: {
      email?: string;
      username?: string;
      password?: string;
    } = {};

    if (email === '') {
      newErrorMessages.email = 'Email is required';
    } else if (/!^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      newErrorMessages.email = 'Email is invalid';
    }

    if (username === '') {
      newErrorMessages.username = 'Username is required';
    } else if (username.length < 3 || username.length > 30) {
      newErrorMessages.username =
        'Username should be between 3 and 30 characters';
    } else if (!/[a-zA-Z]/.test(username)) {
      newErrorMessages.username = 'Username should contain at least one letter';
    } else if (/[^a-zA-Z1-9.\-_();]/.test(username)) {
      newErrorMessages.username =
        'Username can only contain letters, numbers, and .-_();';
    }

    if (password === '') {
      newErrorMessages.password = 'Password is required';
    } else if (confirmPassword === '') {
      newErrorMessages.password = 'Password confirmation is required';
    } else if (password.length < 8) {
      newErrorMessages.password =
        'Password should be at least 8 characters long';
    } else if (password !== confirmPassword) {
      newErrorMessages.password = "Confirmation password doesn't match";
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    try {
      const response = await RegisterApiConnection.register(
        email,
        username,
        password,
      );

      if (Object.keys(response).length > 0) {
        setErrorMessages(response);
        return;
      }

      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      await navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col items-center md:grid md:h-screen md:grid-cols-[60%_40%]'>
      <Logo />
      <div className='flex w-11/12 flex-col items-center justify-center rounded-sm bg-white px-2 py-4 md:h-full md:w-full'>
        <form
          onSubmit={userRegister}
          className='mb-4 flex w-full flex-col rounded-sm border md:w-8/12 md:text-center'
        >
          <h1 className='font-title mb-4 text-center text-2xl font-semibold text-indigo-950'>
            {'Sign up'}
          </h1>

          <label htmlFor='email' className='hidden'>
            {'Email'}
          </label>
          <input
            type='email'
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder='Email'
            id='email'
            className={`w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950 ${errorMessages.email === undefined ? 'mb-4' : ''}`}
          />
          <p
            className={`text-danger mb-4 text-left text-xs ${errorMessages.email === undefined ? 'hidden' : ''}`}
          >
            {errorMessages.email}
          </p>

          <label htmlFor='username' className='hidden'>
            {'Username'}
          </label>
          <input
            type='text'
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder='Username'
            id='username'
            className={`w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950 ${errorMessages.username === undefined ? 'mb-4' : ''}`}
          />
          <p
            className={`text-danger mb-4 text-left text-xs ${errorMessages.username === undefined ? 'hidden' : ''}`}
          >
            {errorMessages.username}
          </p>

          <div
            className={`relative ${errorMessages.password === undefined ? 'mb-4' : ''}`}
          >
            <label htmlFor='password' className='hidden'>
              {'Password'}
            </label>
            <input
              type={isTrue ? 'text' : 'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder='Password'
              id='password'
              className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
            />

            <button
              type='button'
              aria-label={`${isTrue ? 'Hide' : 'Show'} password`}
              title={`${isTrue ? 'Hide' : 'Show'} password`}
              className='absolute top-1/2 right-5 flex h-5 w-5 -translate-y-1/2 cursor-pointer'
              onClick={toggleTrue}
            >
              {isTrue ? (
                <img src={hiddenPassword} alt='' aria-hidden />
              ) : (
                <img src={show} alt='' aria-hidden />
              )}
            </button>
          </div>
          <p
            className={`text-danger mb-4 text-left text-xs ${errorMessages.password === undefined ? 'hidden' : ''}`}
          >
            {errorMessages.password}
          </p>

          <label htmlFor='confirm-password' className='hidden'>
            {'Confirm password'}
          </label>
          <input
            type={isTrue ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            placeholder='Confirm password'
            id='confirm-password'
            className='mb-4 w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
          />

          <Button title={'Sign up'} />
          <p className='text-left text-xs text-black'>
            {'Already have an account ? '}
            <Link to={'/'} className='text-rose-600' title='Go to log in'>
              {'Log in.'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

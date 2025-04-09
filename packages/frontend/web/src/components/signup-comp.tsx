/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable unicorn/prevent-abbreviations */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useShowPassword from '@/hooks/use-show-password';

import hiden from '../assets/icons/hide-white.svg';
import show from '../assets/icons/show-white.svg';
import Button from './button';
import Logo from './logo';

const API_URL = import.meta.env.VITE_API_URL;

export default function SignupComp() {
  const [isVisible, toggleVisible] = useShowPassword() as [boolean, () => void];

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const userRegister = async function (event: React.FormEvent) {
    event.preventDefault();
    try {
      const res = await fetch(`${API_URL}/register`, {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        // await navigate('/login');
      } else {
        console.log(res.json());
      }
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
          className='flex w-full flex-col gap-y-4 rounded-sm border md:w-8/12 md:text-center'
        >
          <h1 className='font-title text-center text-2xl font-semibold text-indigo-950'>
            {'Sign up'}
          </h1>
          <input
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='email'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
          />
          <input
            type='text'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder='username'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
          />
          <div className='relative'>
            <input
              type={isVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder='password'
              className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
            />

            <div
              className='absolute top-1/2 right-5 flex h-5 w-5 -translate-y-1/2 cursor-pointer'
              onClick={toggleVisible}
            >
              {isVisible ? (
                <img src={hiden} alt='eye hide' />
              ) : (
                <img src={show} alt='eye show' />
              )}
            </div>
          </div>
          <input
            type={isVisible ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            placeholder='password'
            className='w-full rounded-sm border bg-indigo-900 p-2 text-white outline-indigo-950'
          />

          <Button title={'Sign up'} />

          <p className='text-xs'>
            {'Already have an account ? '}
            <Link to={'/login'} className='text-rose-600'>
              {' Log in.'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

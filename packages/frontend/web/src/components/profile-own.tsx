import { Link } from 'react-router-dom';

import Parameters from '@/pages/parameters';

import menu from '../assets/icons/menu-square-white.svg';
import user from '../assets/pictures/users/user.png';

export default function ProfileOwn() {
  return (
    <section className='mr-[64px] mb-[8px] ml-[64px] flex-col pt-[64px]'>
      <div className='flex justify-start border-b-[2px] border-purple-900'>
        <img
          className='mb-[32px] size-[150px] rounded-[4px]'
          src={user}
          alt='user'
        />
        <div className='flex-column mb-[8px] ml-[16px] max-h-[100%]'>
          <div className='flex items-center'>
            <p className='font-title text-[24px]'>{'@Aang_2006'}</p>
            <p className='font-title ml-[8px] text-[16px] text-blue-400'>
              {'000'}
            </p>
          </div>
          <div className='mb-[8px] flex text-[16px]'>
            <p className='mr-[2px] text-blue-400'>{'2'}</p>
            <p className='mr-[8px]'>{'posts'}</p>
            <p className='mr-[2px] text-blue-400'>{'5'}</p>
            <p className='mr-[8px]'>{'followers'}</p>
            <p className='mr-[2px] text-blue-400'>{'18'}</p>
            <p>{'following'}</p>
          </div>
          <p className='w-[496px]'>
            {'Lorem ipsum dolor sit amet consectetur. Sem convallis lectus'}
            {'interdum nulla. Ut platea egestas viverra fringilla. Placerat'}
            {
              'pharetra vitae sodales ac odio cras. Neque nisi enim ut faucibus.'
            }
          </p>
        </div>

        <Link className='ml-auto' to='/parameters'>
          <img className='size-[32px]' src={menu} alt='Menu' />
        </Link>
      </div>

      <section className='flex flex-wrap justify-center pt-[8px]'>
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/583/324/324.jpg?hmac=_8OgYWeM7dT5ELi44b6og4QWKmQBh7rDbV8E_sT8Jcg'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/964/324/324.jpg?hmac=zY-ykQoZZW6RLhi9FQPhd2xuHAFiLayAUH3pCKdK5ZE'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/459/324/324.jpg?hmac=k4dERX6Xdre7ZzjU3Yw8NM4qXPYAuoxwRLVNjeEYM30'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/292/324/324.jpg?hmac=nCGCba3kqkRJWGbWKBv-k_iUbZ3DBq6fbBhijvNDiN0'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/583/324/324.jpg?hmac=_8OgYWeM7dT5ELi44b6og4QWKmQBh7rDbV8E_sT8Jcg'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/964/324/324.jpg?hmac=zY-ykQoZZW6RLhi9FQPhd2xuHAFiLayAUH3pCKdK5ZE'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/459/324/324.jpg?hmac=k4dERX6Xdre7ZzjU3Yw8NM4qXPYAuoxwRLVNjeEYM30'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/292/324/324.jpg?hmac=nCGCba3kqkRJWGbWKBv-k_iUbZ3DBq6fbBhijvNDiN0'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/583/324/324.jpg?hmac=_8OgYWeM7dT5ELi44b6og4QWKmQBh7rDbV8E_sT8Jcg'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/964/324/324.jpg?hmac=zY-ykQoZZW6RLhi9FQPhd2xuHAFiLayAUH3pCKdK5ZE'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/459/324/324.jpg?hmac=k4dERX6Xdre7ZzjU3Yw8NM4qXPYAuoxwRLVNjeEYM30'
          alt=''
        />
        <img
          className='mr-[8px] pt-[8px]'
          src='https://fastly.picsum.photos/id/292/324/324.jpg?hmac=nCGCba3kqkRJWGbWKBv-k_iUbZ3DBq6fbBhijvNDiN0'
          alt=''
        />
      </section>
    </section>
  );
}

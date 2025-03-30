import { Link } from 'react-router-dom';

import menu from '../assets/icons/menu-square-white.svg';
import user from '../assets/pictures/users/user.png';

export default function ProfileOwn() {
  return (
    <section className='mt-[4rem] mr-[4rem] mb-[0.5rem] ml-[4rem] flex-col'>
      <div className='flex justify-start border-b-[0.125rem] border-purple-900'>
        <img
          className='mb-[2rem] size-[9.375rem] rounded-[4px]'
          src={user}
          alt='user'
        />
        <div className='flex-column mb-[0.5rem] ml-[1rem] max-h-[100%] w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <p className='font-title text-[1.5rem]'>{'@Aang_2006'}</p>
              <p className='font-title ml-[0.5rem] text-[1rem] text-blue-400'>
                {'000'}
              </p>
            </div>

            <Link className='relative z-50 h-8 w-8' to='/parameters'>
              <img className='relative z-50 h-8 w-8' src={menu} alt='Menu' />
            </Link>
          </div>
          <div className='mb-[0.5rem] flex text-[1rem]'>
            <p className='mr-[0.125rem] text-blue-400'>{'2'}</p>
            <p className='mr-[0.5rem]'>{'posts'}</p>
            <p className='mr-[0.125rem] text-blue-400'>{'5'}</p>
            <p className='mr-[0.5rem]'>{'followers'}</p>
            <p className='mr-[0.125rem] text-blue-400'>{'18'}</p>
            <p>{'following'}</p>
          </div>
          <p className='w-[31rem]'>
            {'Lorem ipsum dolor sit amet consectetur. Sem convallis lectus'}
            {'interdum nulla. Ut platea egestas viverra fringilla. Placerat'}
            {
              'pharetra vitae sodales ac odio cras. Neque nisi enim ut faucibus.'
            }
          </p>
        </div>
      </div>

      <section className='mt-[0.5rem] flex flex-wrap justify-center'>
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/583/324/324.jpg?hmac=_8OgYWeM7dT5ELi44b6og4QWKmQBh7rDbV8E_sT8Jcg'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/964/324/324.jpg?hmac=zY-ykQoZZW6RLhi9FQPhd2xuHAFiLayAUH3pCKdK5ZE'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/459/324/324.jpg?hmac=k4dERX6Xdre7ZzjU3Yw8NM4qXPYAuoxwRLVNjeEYM30'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/292/324/324.jpg?hmac=nCGCba3kqkRJWGbWKBv-k_iUbZ3DBq6fbBhijvNDiN0'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/583/324/324.jpg?hmac=_8OgYWeM7dT5ELi44b6og4QWKmQBh7rDbV8E_sT8Jcg'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/964/324/324.jpg?hmac=zY-ykQoZZW6RLhi9FQPhd2xuHAFiLayAUH3pCKdK5ZE'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/459/324/324.jpg?hmac=k4dERX6Xdre7ZzjU3Yw8NM4qXPYAuoxwRLVNjeEYM30'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/292/324/324.jpg?hmac=nCGCba3kqkRJWGbWKBv-k_iUbZ3DBq6fbBhijvNDiN0'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/583/324/324.jpg?hmac=_8OgYWeM7dT5ELi44b6og4QWKmQBh7rDbV8E_sT8Jcg'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/964/324/324.jpg?hmac=zY-ykQoZZW6RLhi9FQPhd2xuHAFiLayAUH3pCKdK5ZE'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/459/324/324.jpg?hmac=k4dERX6Xdre7ZzjU3Yw8NM4qXPYAuoxwRLVNjeEYM30'
          alt=''
        />
        <img
          className='mt-[0.5rem] mr-[0.5rem]'
          src='https://fastly.picsum.photos/id/292/324/324.jpg?hmac=nCGCba3kqkRJWGbWKBv-k_iUbZ3DBq6fbBhijvNDiN0'
          alt=''
        />
      </section>
    </section>
  );
}

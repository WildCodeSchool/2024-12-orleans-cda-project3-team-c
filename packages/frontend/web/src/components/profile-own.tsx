import { Link } from 'react-router-dom';

import menu from '../assets/icons/menu-square-white.svg';
import user from '../assets/pictures/users/user.png';

export default function ProfileOwn() {
  const stats = [
    { label: 'posts', count: 2 },
    { label: 'followers', count: 5 },
    { label: 'following', count: 18 },
  ];

  const images = [
    'https://fastly.picsum.photos/id/583/324/324.jpg?hmac=_8OgYWeM7dT5ELi44b6og4QWKmQBh7rDbV8E_sT8Jcg',
    'https://fastly.picsum.photos/id/964/324/324.jpg?hmac=zY-ykQoZZW6RLhi9FQPhd2xuHAFiLayAUH3pCKdK5ZE',
    'https://fastly.picsum.photos/id/459/324/324.jpg?hmac=k4dERX6Xdre7ZzjU3Yw8NM4qXPYAuoxwRLVNjeEYM30',
    'https://fastly.picsum.photos/id/292/324/324.jpg?hmac=nCGCba3kqkRJWGbWKBv-k_iUbZ3DBq6fbBhijvNDiN0',
  ];

  return (
    <section className='mx-16 mb-2 flex flex-col pt-16'>
      <div className='flex items-start border-0 pb-4 md:border-b-2 md:border-purple-900 md:pb-8'>
        <img className='size-16 rounded md:size-40' src={user} alt='User' />
        <div className='ml-4 w-full'>
          <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <p className='font-title text-2xl'>{'@Aang_2006'}</p>
                <p className='font-title text-base text-blue-400'>{'000'}</p>
              </div>
              <Link to='/parameters'>
                <img className='size-8' src={menu} alt='Menu' />
              </Link>
            </div>

            <ul className='mb-2 flex gap-4 text-sm'>
              {stats.map(({ label, count }) => (
                <li key={label} className='flex items-center gap-1'>
                  <span className='text-blue-400'>{count}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <p className='hidden max-w-lg md:block'>
              {'Lorem ipsum dolor sit amet consectetur. Sem convallis lectus'}
              {'interdum nulla. Ut platea egestas viverra fringilla. Placerat'}
              {
                'pharetra vitae sodales ac odio cras. Neque nisi enim ut faucibus.'
              }
            </p>
          </div>
        </div>
      </div>
      <p className='max-w-lg border-b-2 border-purple-900 pb-4 md:hidden'>
        {'Lorem ipsum dolor sit amet consectetur. Sem convallis lectus'}
        {
          'interdum nulla. Ut platea egestas viverra fringilla. Placerat pharetra'
        }
        {'vitae sodales ac odio cras. Neque nisi enim ut faucibus.'}
      </p>

      <section className='flex flex-wrap justify-center gap-2 pt-2'>
        {[...images, ...images].map((source, index) => (
          <img
            key={index}
            className='size-40 sm:size-56 md:size-81'
            src={source}
            alt={`Post ${index + 1}`}
          />
        ))}
      </section>
    </section>
  );
}

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
    <section className='mx-4 flex flex-col pt-4 sm:mx-16 sm:pt-16'>
      <div className='md:border-turquoise-blue-400 flex items-start border-0 pb-4 md:border-b-2 md:pb-8'>
        {/* selectionner l'image de l'utilisateur actuel */}
        <img className='size-16 rounded md:size-40' src={user} alt='User' />
        <div className='ml-4 w-full'>
          <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                {/* selectionner le nom de l'utilisateur actuel */}
                <p className='font-title text-sm sm:text-2xl'>{'@Aang_2006'}</p>
                {/* le 121 je sais pas ce que c'est */}
                <p className='font-title text-turquoise-blue-400 text-xs sm:text-base'>
                  {'121'}
                </p>
              </div>
              <Link to='/parameters'>
                <img className='size-6 md:size-8' src={menu} alt='Menu' />
              </Link>
            </div>

            <ul className='mb-2 flex gap-4 text-xs sm:text-base'>
              {stats.map(({ label, count }) => (
                <li key={label} className='flex items-center gap-1'>
                  <span className='text-turquoise-blue-400'>{count}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <p className='hidden max-w-lg text-base md:block'>
              {'Lorem ipsum dolor sit amet consectetur. Sem convallis lectus'}
              {'interdum nulla. Ut platea egestas viverra fringilla. Placerat'}
              {
                'pharetra vitae sodales ac odio cras. Neque nisi enim ut faucibus.'
              }
            </p>
          </div>
        </div>
      </div>
      <p className='border-turquoise-blue-400 max-w-lg border-b-2 pb-4 text-sm md:hidden'>
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

import { useEffect, useState } from 'react';

import userApiConnection, {
  type UserPost,
  type UserProfile,
} from '../api-connection/user-api-connection';

export default function ProfileOwn() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    userApiConnection
      .getOwnProfile()
      .then((profile) => {
        setUserProfile(profile);
        setPosts(profile.posts);
      })
      .catch((error: unknown) => {
        console.error('Erreur de récupération du profil :', error);
      });
  }, []);

  if (!userProfile) {
    return <div>{'Loading profile...'}</div>;
  }

  return (
    <section className='mx-4 flex flex-col pt-4 sm:mx-16 sm:pt-16'>
      <div className='md:border-turquoise-blue-400 flex items-start border-0 pb-4 md:border-b-2 md:pb-8'>
        <img
          className='size-16 rounded md:size-40'
          src={
            userProfile.profile_picture || '../assets/icons/user-white.svg.jpg'
          }
          alt='User'
        />
        <div className='ml-4 w-full'>
          <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <p className='font-title text-sm sm:text-2xl'>
                  {userProfile.username}
                </p>
                <p className='font-title text-turquoise-blue-400 text-xs sm:text-base'>
                  {'121'}
                </p>
              </div>
            </div>

            <ul className='mb-2 flex gap-4 text-xs sm:text-base'>
              <li className='flex items-center gap-1'>
                <span className='text-turquoise-blue-400'>{'2'}</span>
                <span>{'posts'}</span>
              </li>
              <li className='flex items-center gap-1'>
                <span className='text-turquoise-blue-400'>{'5'}</span>
                <span>{'followers'}</span>
              </li>
              <li className='flex items-center gap-1'>
                <span className='text-turquoise-blue-400'>{'18'}</span>
                <span>{'following'}</span>
              </li>
            </ul>

            <p className='hidden max-w-lg text-base md:block'>
              {userProfile.biography}
            </p>
          </div>
        </div>
      </div>

      <section className='flex flex-wrap justify-center gap-2 pt-2'>
        {posts.map((post, index) => (
          <div key={post.id} className='post'>
            <img
              className='size-40 sm:size-56 md:size-81'
              src={post.picture}
              alt={`Post ${index + 1}`}
            />
            <p>{post.description}</p>
          </div>
        ))}
      </section>
    </section>
  );
}

import { useEffect, useState } from 'react';

import userApiConnection, {
  type UserPost,
  type UserProfile,
} from '../api-connection/user-api-connection';

// Utilisation de `type` pour les types

export default function ProfileOwn() {
  // Typage des états
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);

  useEffect(() => {
    // Récupération des données via l'API
    userApiConnection
      .getOwnProfile()
      .then((profile) => {
        setUserProfile(profile); // Assurer que le profil est récupéré
        setPosts(profile.posts); // On récupère les posts du profil
      })
      .catch((error: unknown) => {
        // Typage du catch avec "unknown"
        console.error('Erreur de récupération du profil :', error);
      });
  }, []);

  if (!userProfile) {
    return <div>{'Loading...'}</div>; // Afficher un message de chargement si le profil n'est pas encore chargé
  }

  return (
    <section className='mx-4 flex flex-col pt-4 sm:mx-16 sm:pt-16'>
      <div className='md:border-turquoise-blue-400 flex items-start border-0 pb-4 md:border-b-2 md:pb-8'>
        <img
          className='size-16 rounded md:size-40'
          src={userProfile.profile_picture || '/path/to/default-image.jpg'}
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
              {/* Assumes that stats is either hardcoded or fetched */}
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
              {userProfile.bio}
            </p>
          </div>
        </div>
      </div>

      <section className='flex flex-wrap justify-center gap-2 pt-2'>
        {posts.map(
          (
            post,
            index, // Typage correct du post
          ) => (
            <div key={post.id} className='post'>
              <img
                className='size-40 sm:size-56 md:size-81'
                src={post.picture}
                alt={`Post ${index + 1}`}
              />
              <p>{post.description}</p>
            </div>
          ),
        )}
      </section>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import postApiConnection from '../api-connection/post-api-connection';
import userApiConnection, {
  type UserPost,
  type UserProfile,
} from '../api-connection/user-api-connection';
import menu from '../assets/icons/menu-square-white.svg';

const cdnUrl = import.meta.env.VITE_CDN_URL;

export default function ProfileOwn() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const profile = await userApiConnection.getOwnProfile();
        setUserProfile(profile);
        setPosts(profile.posts);

        const [followers, following] = await Promise.all([
          postApiConnection.getFollowersCount(profile.id),
          postApiConnection.getFollowingCount(profile.id),
        ]);

        setFollowersCount(followers);
        setFollowingCount(following);
      } catch (error) {
        console.error('Erreur de récupération des données :', error);
      }
    };

    void fetchData();
  }, []);

  if (!userProfile) {
    return (
      <div className='pt-10 text-center text-white'>{'Loading profile...'}</div>
    );
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
                  {userProfile.notoriety}
                </p>
              </div>
              <Link to='/parameters'>
                <img className='size-6 md:size-8' src={menu} alt='Menu' />
              </Link>
            </div>

            <ul className='mb-2 flex gap-4 text-xs sm:text-base'>
              <li className='flex items-center gap-1'>
                <span className='text-turquoise-blue-400'>{posts.length}</span>
                <span>{'posts'}</span>
              </li>
              <li className='flex items-center gap-1'>
                <span className='text-turquoise-blue-400'>
                  {followersCount}
                </span>
                <span>{'followers'}</span>
              </li>
              <li className='flex items-center gap-1'>
                <span className='text-turquoise-blue-400'>
                  {followingCount}
                </span>
                <span>{'following'}</span>
              </li>
            </ul>

            <p className='hidden max-w-lg text-base md:block'>
              {userProfile.biography}
            </p>
          </div>
        </div>
      </div>

      <p className='border-turquoise-blue-400 max-w-lg border-b-2 pb-4 text-sm md:hidden'>
        {userProfile.biography}
      </p>

      <section className='flex flex-wrap justify-center gap-2 pt-2'>
        {posts.map((post, index) => (
          <div key={post.id} className='post'>
            <img
              className='size-40 sm:size-56 md:size-81'
              src={
                post.picture
                  ? `${cdnUrl}/pictures/posts/${post.picture}`
                  : '/fallback.jpg'
              }
              alt={`Post ${index + 1}`}
            />
          </div>
        ))}
      </section>
    </section>
  );
}

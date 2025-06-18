import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { PostSearchResult, UserSearchResult } from '@app/api';

import searchApiConnection from '@/api-connection/search-api-connection';

import searchIcon from '../assets/icons/search-white.svg';

export default function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{
    users: UserSearchResult[];
    posts: PostSearchResult[];
  }>({
    users: [],
    posts: [],
  });
  const [userLimit, setUserLimit] = useState(3);
  const [postByTagLimit, setPostByTagLimit] = useState(3);

  const getSearchResults = async () => {
    try {
      const { data, error } = await searchApiConnection.search(
        search,
        userLimit,
        postByTagLimit,
      );

      if (error) {
        console.error('Error fetching search results:', error);
        return;
      }

      if (data) {
        const usersResults = data.users;

        const postsResults = data.posts;

        setResults({ users: usersResults, posts: postsResults });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void getSearchResults();
  };

  const loadMoreUsers = () => {
    setUserLimit((prevLimit) => prevLimit + 3);
  };

  const loadMorePosts = () => {
    setPostByTagLimit((prevLimit) => prevLimit + 3);
  };

  return (
    <section className='flex flex-col items-center'>
      <h2 className='md:font-title hidden md:mt-40 md:mb-9 md:inline-block md:text-[1.5rem]'>
        {'Search for user or subject'}
      </h2>
      <div className='m-4 flex w-[18rem] items-center rounded-[0.25rem] border border-gray-300 bg-purple-900 p-0.5 pr-2'>
        <form onSubmit={handleSubmit} className='w-full'>
          <input
            className='flex-1 bg-transparent px-2 py-1 text-[0.75rem] placeholder-gray-500 focus:border-blue-500 focus:outline-none'
            type='text'
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder='Search'
          />
        </form>
        <button type='submit' aria-label='Search' title='Search'>
          <img
            className='ml-2 size-[1rem]'
            src={searchIcon}
            aria-hidden='true'
            alt=''
          />
        </button>
      </div>
      <ul className='w-[18rem]'>
        {results.users.length > 0 ? (
          <>
            <h3 className='mb-4'>{'Users'}</h3>
            <ul>
              {results.users.slice(0, userLimit).map((user) => (
                <li key={user.id} className='mb-2'>
                  <Link
                    to={`/profile/${user.username}`}
                    className='mb-4 flex items-center gap-2'
                  >
                    <img
                      src={`/cdn/pictures/users/${user.profile_picture}`}
                      alt={user.username}
                      className='size-8 rounded'
                    />
                    {user.username}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={loadMoreUsers}
              type='button'
              className='border-turquoise-blue-400 mt-2 flex w-12 items-center justify-center rounded border'
            >
              <span className='text-turquoise-blue-400 px-3 py-1 text-center text-xs'>
                {'More'}
              </span>
            </button>
          </>
        ) : null}

        {results.posts.length > 0 ? (
          <>
            <h3 className='mb-4'>{'Posts:'}</h3>
            <ul>
              {results.posts.slice(0, postByTagLimit).map((post) => (
                <li key={post.id}>
                  <img
                    src={`/cdn/pictures/posts/${post.picture}`}
                    alt={post.description ?? 'No description'}
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={loadMorePosts}
              type='button'
              className='border-turquoise-blue-400 mt-2 flex items-center rounded border'
            >
              <span className='text-turquoise-blue-400 px-3 py-1 text-center text-xs'>
                {'More'}
              </span>
            </button>
          </>
        ) : null}
      </ul>
    </section>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';

import searchApiConnection from '@/api-connection/search-api-connection';

import searchIcon from '../assets/icons/search-white.svg';

export default function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<{
    users: Array<{ id: string; name: string }>;
    posts: Array<{ id: string; title: string | null }>;
  }>({
    users: [],
    posts: [],
  });
  const [userLimit, setUserLimit] = useState(3);
  const [postLimit, setPostLimit] = useState(3);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearch(input);
  };

  const getSearchResults = async () => {
    try {
      const { data, error } = await searchApiConnection.search(search);

      if (error) {
        console.error('Error fetching search results:', error);
        return;
      }

      if (data) {
        const usersResults = data.users.map((user) => ({
          id: user.id.toString(),
          name: user.username,
        }));

        const postsResults = data.posts.map((post) => ({
          id: post.id.toString(),
          title: post.description,
        }));

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
    setPostLimit((prevLimit) => prevLimit + 3);
  };

  return (
    <section className='flex flex-col items-center'>
      <h2 className='md:font-title hidden md:mt-40 md:mb-9 md:inline-block md:text-[1.5rem]'>
        {'Search for user or subject'}
      </h2>
      <div className='m-4 flex w-[18rem] items-center rounded-[0.25rem] border border-gray-300 bg-purple-900 p-0.5 pr-2'>
        <form action='' onSubmit={handleSubmit} className='w-full'>
          <input
            className='flex-1 bg-transparent px-2 py-1 text-[0.75rem] placeholder-gray-500 focus:border-blue-500 focus:outline-none'
            type='text'
            value={search}
            onChange={handleSearch}
            placeholder='Search'
          />
        </form>
        <Link to='/search'>
          <img
            className='ml-2 size-[1rem]'
            src={searchIcon}
            alt='search icon'
          />
        </Link>
      </div>
      <ul>
        {'Search results'}
        {results.users.length > 0 && (
          <li>
            <h3>{'Users:'}</h3>
            <ul>
              {results.users.slice(0, userLimit).map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
            {userLimit < results.users.length && (
              <button
                onClick={loadMoreUsers}
                type='button'
                className='border-turquoise-blue-400 flex items-center rounded border'
              >
                <span className='text-turquoise-blue-400 px-3 py-1 text-center text-xs'>
                  {'More'}
                </span>
              </button>
            )}
          </li>
        )}
        {results.posts.length > 0 && (
          <>
            <h3>{'Posts:'}</h3>
            <ul>
              {results.posts.slice(0, postLimit).map((post) => (
                <li key={post.id}>{post.title ?? 'No description'}</li>
              ))}
            </ul>
            {postLimit < results.posts.length && (
              <button
                onClick={loadMorePosts}
                type='button'
                className='border-turquoise-blue-400 flex items-center rounded border'
              >
                <span className='text-turquoise-blue-400 px-3 py-1 text-center text-xs'>
                  {'More'}
                </span>
              </button>
            )}
          </>
        )}
      </ul>
    </section>
  );
}

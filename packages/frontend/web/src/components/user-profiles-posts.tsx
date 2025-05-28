import { Link } from 'react-router-dom';

type Post = {
  id: number | string;
  picture?: string;
};

type UserProfile = {
  username: string;
  posts?: Post[];
};

type UserProfilesPostsProps = {
  readonly profile: UserProfile;
};

export default function UserProfilesPosts({ profile }: UserProfilesPostsProps) {
  if (!profile.posts || profile.posts.length === 0) {
    return (
      <div className='py-8 text-center text-white'>
        {'Aucun post à afficher.'}
      </div>
    );
  }

  return (
    <section className='grid h-82 grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'>
      {profile.posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${profile.username}#${post.id}`}>
            <img
              className='size-40 sm:size-56 md:size-81'
              src={
                post.picture
                  ? `/cdn/pictures/posts/${post.picture}`
                  : '/user-mock.png'
              }
              alt={`Post ${post.id}`}
            />
          </Link>
        </div>
      ))}
    </section>
  );
}

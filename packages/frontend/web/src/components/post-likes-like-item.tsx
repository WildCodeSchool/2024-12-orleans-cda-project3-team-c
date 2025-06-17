import { Link } from 'react-router-dom';

import type { PostLikeItem } from '@app/api';

import certificationIcon from '../assets/icons/certification-pink.png';

export default function PostLikesLikeItem({
  like,
}: {
  readonly like: PostLikeItem;
}) {
  return (
    <li className=''>
      <Link
        to={`/profile/${like.username}`}
        className='mb-2 flex items-center gap-2'
      >
        <div className='size-8 overflow-hidden rounded'>
          <img
            src={`/cdn/pictures/users/${like.profile_picture}`}
            alt={`${like.username} profile picture`}
          />
        </div>
        <h2 className='font-title flex gap-1 text-sm md:text-base'>
          {'@'}
          {like.username}
          {like.status === 'certified' ? (
            <img
              src={certificationIcon}
              alt='certification'
              className='size-3 md:size-4'
            />
          ) : null}
        </h2>
      </Link>
    </li>
  );
}

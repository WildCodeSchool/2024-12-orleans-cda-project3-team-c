// import { Link } from 'react-router-dom';

// import type { PostType } from '@/posts-mock';

// import commentIcon from '../assets/icons/comment-white.svg';
// import likedIcon from '../assets/icons/flame-pink.svg';
// import likeIcon from '../assets/icons/flame-white.svg';

// export default function Post({ post }: { post: object }) {
//   // calcul du temps écoulé depuis le post
//   const timing = Date.now() - Date.parse(post.created_at);
//   let timeAgo: string;
//   if (timing >= 86400000) {
//     const days = Math.floor(timing / 86400000);
//     timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
//   } else if (timing >= 3600000) {
//     const hours = Math.floor(timing / 3600000);
//     timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
//   } else if (timing >= 60000) {
//     const minutes = Math.floor(timing / 60000);
//     timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//   } else {
//     timeAgo = `${Math.floor(timing / 1000)} seconds ago`;
//   }

//   // jsx
//   return (
//     <article className='mb-8'>
//       <header className='flex items-center justify-between p-2'>
//         <Link to={'#'} className='flex items-center gap-4'>
//           <div className='w-8 overflow-hidden rounded'>
//             <img
//               src={`/pictures/users/${post.author.profile_picture}`}
//               alt={`${post.author.username} profile picture`}
//             />
//           </div>
//           <h2 className='text-[14px} font-title'>@{post.author.username}</h2>
//         </Link>
//         {post.author.isFollowed && (
//           <button
//             type='button'
//             className='border-turquoise-blue-400 text-turquoise-blue-400 text-title rounded border px-2 py-[2px] text-[12px]'
//           >
//             Follow
//           </button>
//         )}
//       </header>

//       <div className='slideshow-container mb-1'>
//         <div className='slide'>
//           <img src={`/pictures/posts/${post.picture}`} alt='' />
//         </div>
//       </div>

//       <div className='post-content p-2'>
//         <div className='post-action-container flex items-center gap-2'>
//           <div className='flex items-center gap-1'>
//             <button
//               aria-label={`${post.isLiked ? 'Like' : 'Unlike'} this post`}
//               title={`${post.isLiked ? 'Like' : 'Unlike'} this post`}
//               type='button'
//               className='like-btn'
//             >
//               <img
//                 src={post.isLiked ? likedIcon : likeIcon}
//                 alt=''
//                 className='w-8'
//                 aria-hidden='true'
//               />
//             </button>
//             <p className='text-title text-[12px]'>
//               {post.likes ? post.likes : null}
//             </p>
//           </div>
//           <button
//             type='button'
//             className='comment-btn flex items-center gap-1'
//             aria-label='Comments'
//             title='Comments'
//           >
//             <img src={commentIcon} alt='' className='w-8' aria-hidden='true' />
//             <span className='text-title text-[12px]'>
//               {post.comments.length}
//             </span>
//           </button>
//         </div>

//         <p className='post-description mb-1 text-[14px]'>
//           <span className='font-title'>@{post.author.username}</span>{' '}
//           {post.description}
//         </p>
//         <p className='post-date text-placeholder text-[10px]'>{timeAgo}</p>
//       </div>
//     </article>
//   );
// }

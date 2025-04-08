import type postLikeModel from './post-like-model';
import type postModel from './post-model';

// Posts **************************************************
export type FeedPost = Awaited<
  ReturnType<typeof postModel.getFeedPage>
>[number];

// Post likes **************************************************
export type PostLikesCountByPost = Awaited<
  ReturnType<typeof postLikeModel.getPostsLikesCountByPost>
>;

export type PostLikesCountByGiver = Awaited<
  ReturnType<typeof postLikeModel.getPostsLikesCountByGiver>
>;

export type PostLikesCountByReceiver = Awaited<
  ReturnType<typeof postLikeModel.getPostsLikesCountByReceiver>
>;

export type PostLike = Awaited<
  ReturnType<
    typeof postLikeModel.addPostLike | typeof postLikeModel.deletePostLike
  >
>;

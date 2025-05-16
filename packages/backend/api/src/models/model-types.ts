import type followModel from './follow-up-model';
import type postLikeModel from './post-like-model';
import type postModel from './post-model';
import type {
  getPostsInfoInTagBySearch,
  getUsersInfoBySearch,
} from './search-model';
import type userModel from './user-model';

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

export type PostTagInsertionList = {
  tag_id: number;
  post_id: number;
};

export type UserPost = Awaited<ReturnType<typeof postModel.getFeedPage>>;

export type UserProfile = Awaited<
  ReturnType<typeof userModel.getUserProfileById>
>;

// Follow **************************************************
export type FollowAction = Awaited<
  ReturnType<typeof followModel.addFollow | typeof followModel.deleteFollow>
>;

export type UserSuggestion = Awaited<
  ReturnType<typeof userModel.getUserSuggestionsForUser>
>[number];

export type UserSearchResult = Awaited<
  ReturnType<typeof getUsersInfoBySearch>
>[number];

export type PostSearchResult = Awaited<
  ReturnType<typeof getPostsInfoInTagBySearch>
>[number];

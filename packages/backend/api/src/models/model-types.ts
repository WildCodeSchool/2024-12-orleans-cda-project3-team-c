import type commentLikeModel from './comment-like-model';
import type commentModel from './comment-model';
import type followModel from './follow-up-model';
import type postLikeModel from './post-like-model';
import type postModel from './post-model';
import type searchModel from './search-model';
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

export type CommentLike = Awaited<
  ReturnType<
    | typeof commentLikeModel.addCommentLike
    | typeof commentLikeModel.deleteCommentLike
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
  ReturnType<typeof searchModel.getUsersInfoBySearch>
>[number];

export type PostSearchResult = Awaited<
  ReturnType<typeof searchModel.getPostsInfoInTagBySearch>
>[number];

export type PostComment = Awaited<
  ReturnType<typeof commentModel.getCommentsByPostId>
>[number];

export type UserFollowers = Awaited<
  ReturnType<typeof followModel.getFollowees>
>[number];

export type UserFollowees = Awaited<
  ReturnType<typeof followModel.getFollowers>
>[number];

export type PostLikeItem = Awaited<
  ReturnType<typeof postLikeModel.getLikesByPost>
>[number];

export type PostPreview = Awaited<
  ReturnType<typeof postModel.getUserPostPreviews>
>[number];

export type UserFollower = Awaited<
  ReturnType<typeof followModel.getFollowers>
>[number];

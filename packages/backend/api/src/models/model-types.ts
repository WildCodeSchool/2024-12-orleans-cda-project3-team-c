import type followModel from './follow-suggestion-model';
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

export type PostTagInsertionList = {
  tag_id: number;
  post_id: number;
};

// Follow **************************************************
export type FollowCheckStatus = Awaited<
  ReturnType<typeof followModel.checkFollowStatus>
>;

export type FollowersCount = Awaited<
  ReturnType<typeof followModel.getFollowersSuggestionCount>
>;

export type FollowingCount = Awaited<
  ReturnType<typeof followModel.getFollowingSuggestionCount>
>;

export type FollowAction = Awaited<
  ReturnType<
    | typeof followModel.addFollowSuggestion
    | typeof followModel.deleteFollowSuggestion
  >
>;

// // Union type for Follow
// export type Follow =
//   | FollowCheckStatus
//   | FollowersCount
//   | FollowingCount
//   | FollowAction;

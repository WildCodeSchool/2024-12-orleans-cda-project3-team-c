import type postModel from './post-model';

export type FeedPost = Awaited<
  ReturnType<typeof postModel.getFeedPage>
>[number];

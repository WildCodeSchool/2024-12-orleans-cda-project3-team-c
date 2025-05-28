import postApiConnection from '@/api-connection/post-api-connection';
import userApiConnection from '@/api-connection/user-api-connection';

export default {
  getFeedPage(page = 1) {
    return postApiConnection.getPage(page);
  },

  getUserFeed(username: string, page = 1) {
    return userApiConnection.getUserFeedPage(username, page);
  },
};

import postApiConnection from '@/api-connection/post-api-connection';

export default {
  getFeedPage(page = 1) {
    return postApiConnection.getPage(page);
  },
};

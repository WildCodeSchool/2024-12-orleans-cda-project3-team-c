import ApiConnection from './api-connection';

type UserSearchResult = {
  id: number;
  username: string;
  profile_picture: string;
};

type PostSearchResult = {
  id: number;
  description: string | null;
  picture: string;
};

type SearchResults = {
  users: UserSearchResult[];
  posts: PostSearchResult[];
};

type SearchResponse = {
  data: SearchResults | null;
  error: string;
};

class SearchApiConnection extends ApiConnection {
  constructor(ressource = 'search') {
    super(ressource);
  }

  async search(query: string): Promise<SearchResponse> {
    if (!query) return { data: null, error: 'Query is empty' };

    try {
      const res = await fetch(`${this.ressourceUrl}?search=${query}`, {
        credentials: 'include',
      });

      if (!res.ok) {
        const errorMessage = `Failed to fetch search results: ${res.status} ${res.statusText}`;
        return { data: null, error: errorMessage };
      }

      const data = await res.json();

      // Validation et typage des données reçues
      const searchResults: SearchResults = {
        users: data.users ?? [],
        posts: data.posts ?? [],
      };

      return { data: searchResults, error: '' };
    } catch (error) {
      console.error('Error during search fetch:', error);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }
}

export default new SearchApiConnection();

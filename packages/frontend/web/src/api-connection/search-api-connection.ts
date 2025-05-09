import ApiConnection from './api-connection';

type SearchResults = {
  id: number;
  description: string;
  picture: string;
  username: string;
  profile_picture: string;
};

class SearchApiConnection extends ApiConnection {
  constructor(ressource = 'search') {
    super(ressource);
  }

  async search(query: string): Promise<SearchResults[] | null> {
    if (!query) return null;
    const res = await fetch(`${this.ressourceUrl}?query=${query}`, {
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to load search results');

    const data = await res.json();

    return data as SearchResults[];
  }
}

export default new SearchApiConnection();

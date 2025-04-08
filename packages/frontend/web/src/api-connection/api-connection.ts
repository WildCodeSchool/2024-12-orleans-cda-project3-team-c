export default class ApiConnection {
  apiUrl = import.meta.env.VITE_API_URL;
  ressource: string;
  ressourceUrl: string;

  constructor(ressource: string) {
    this.ressource = ressource;
    this.ressourceUrl = `${this.apiUrl}/${this.ressource}`;
  }
}

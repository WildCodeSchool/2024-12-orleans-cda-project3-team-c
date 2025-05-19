export default class ApiConnection {
  ressource: string;
  ressourceUrl: string;

  constructor(ressource: string) {
    this.ressource = ressource;
    this.ressourceUrl = `api/${this.ressource}`;
  }
}

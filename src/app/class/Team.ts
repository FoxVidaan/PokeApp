import {Pokemon} from "./Pokemon";

export class Team {
  id: number;
  name: string;
  pokemons: Array<any>;

  constructor(name: string, pokemons: Array<any>) {
    this.id = 0;
    this.name = name;
    this.pokemons = pokemons;
  }
}

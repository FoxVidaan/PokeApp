import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Team} from "../../class/Team";
import {PokemonsService} from "../../services/pokemons.service";
import {TeamsService} from "../../services/teams.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  team: Team = new Team("", []);
  pokemons: Array<any> = [];

  constructor(private pokemonsService: PokemonsService, private teamsService: TeamsService, private router: Router) {
    this.pokemonsService.getAll().subscribe(data => {
      for (let pokemon of data.results) {
        this.pokemonsService.getPokemon(pokemon.url).subscribe(data => {
          this.pokemons.push(data);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  addPokemon(pokemon: any) {
    if (this.team.pokemons.length < 3) {
      this.team.pokemons.push(pokemon);
    }
  }

  save(name: string) {
    if (name.length > 2) {
      this.team.name = name;
    } else {
      this.team.name = `Team ${this.team.pokemons[0].name}`
    }
    this.teamsService.addData(this.team).subscribe(data => {
      this.router.navigate(['teams'])
    });
  }

  reset() {
    this.team.pokemons = [];
  }
}

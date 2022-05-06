import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TeamsService} from "../../services/teams.service";
import {Team} from "../../class/Team";
import {PokemonsService} from "../../services/pokemons.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  id: number = 0;
  ennemyTeam: Team = new Team("", []);
  ennemyActive = this.ennemyTeam.pokemons[0];
  team: Team = new Team("", []);
  pokemonActive = this.team.pokemons[0];
  moves = [];

  constructor(private teamService: TeamsService, private pokemonsService: PokemonsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getTeam();
    this.getEnnemies();
  }

  getEnnemies() {
    for (let i = 0; i < 3; i++) {
      this.pokemonsService.getPokemon(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * (150 - 1)) + 1}/`).subscribe(data => {
        data.hp = 500;
        this.ennemyTeam.pokemons.push(data);
        this.ennemyActive = data;
      })
    }
  }

  getTeam() {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['teamId'];
        this.teamService.getTeam(this.id).subscribe(data => {
          this.team = data;
          this.pokemonActive = this.team.pokemons[0];
          this.pokemonActive.hp = 500;
          this.getMoves();
        });
      });
  }

  getMoves() {
    this.pokemonActive.moves.splice(4, this.pokemonActive.moves.length);
    for (let i = 0; i < this.pokemonActive.moves.length; i++) {
      this.pokemonsService.getMove(this.pokemonActive.moves[i].move.url).subscribe(data => {
        this.pokemonActive.moves[i] = data;
      });
    }
  }

  attack(move: any) {
    if (move.pp <= 0) return;

    move.pp -= 1;

    let ennemy = (document.querySelector(".ennemy .sprite") as HTMLElement);
    let progress = (document.querySelector(".ennemy .progress") as HTMLElement);

    this.ennemyActive.hp -= move.power;
    let hp = (this.ennemyActive.hp / 500) * 100;

    if (hp > 0) {
      console.log(hp);
      ennemy.classList.add("damage");
      progress.style.width = `${hp}%`;
    } else {
      progress.style.width = "0%";
      this.ennemyActive.hp = 0;
      ennemy.classList.add("ko");
    }

    setTimeout(() => {
      ennemy.classList.remove("damage");
    }, 900)
  }

  changeActive(pokemon: any) {
    this.pokemonActive = pokemon;
    this.getMoves();
  }

  leave() {
    if (confirm("Are you sure ?")) {
      this.router.navigate([""]);
    }
  }
}

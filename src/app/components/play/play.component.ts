import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TeamsService } from "../../services/teams.service";
import { Team } from "../../class/Team";
import { PokemonsService } from "../../services/pokemons.service";
import { Pokemon } from 'src/app/class/Pokemon';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  id: number = 0;
  ennemyTeam: Team = new Team("", []);
  ennemyActive = this.ennemyTeam.pokemons[0];
  team: Team = new Team("", [])
  pokemonActive = this.team.pokemons[0];
  selectedMove: any;
  actions = {
    'speedComparison': 1,
    'pokemonChange': 2,
    'pokemonAttack': 3,
    'ennemyAttack': 4,
    'ko': 5,
    'win': 6,
    'loose': 7,
    'endTurn': 8
  };

  constructor(private teamService: TeamsService, private pokemonsService: PokemonsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getTeam();
    this.getEnnemies();
  }

  main(action: number, param?: any) {
    let targetElem;
    let progress;
    let text = (document.querySelector(`.text-zone .text`) as HTMLElement);
    let moves = (document.querySelectorAll(".move") as NodeListOf<HTMLElement>);
    let pokemonCards = (document.querySelectorAll(".pokemon-card") as NodeListOf<HTMLElement>);
    moves.forEach((input) => {
      input.style.pointerEvents = "none";
    });
    pokemonCards.forEach((input) => {
      input.style.pointerEvents = "none";
    });

    switch (action) {
      case 1:
        this.pokemonActive.isAttacked = false;
        this.ennemyActive.isAttacked = false;
        this.selectedMove = param;
        if (this.pokemonActive.speed >= this.ennemyActive.speed) {
          this.main(this.actions.pokemonAttack);
        } else {
          this.main(this.actions.ennemyAttack);
        }
        break;

      case 2:
        text.innerHTML = "Change of pokemon";
        this.pokemonActive = param;
        this.pokemonActive.isAttacked = true;
        let hp = (this.pokemonActive.hp / this.pokemonActive.maxHp) * 100;
        progress = (document.querySelector(`.player .progress`) as HTMLElement);
        progress.style.width = `${hp}%`;
        setTimeout(() => {
          this.main(this.actions.ennemyAttack);
        }, 1500);
        break;
      case 3:
        text.innerHTML = `${this.pokemonActive.name} uses ${this.selectedMove.name}`;
        this.pokemonActive.isAttacked = true;
        this.attack(this.ennemyActive, this.selectedMove, "ennemy");
        break;

      case 4:

        this.ennemyActive.isAttacked = true;
        let min = Math.ceil(0);
        let max = Math.floor(4);
        let ennemyMove = this.ennemyActive.moves[Math.floor(Math.random() * (max - min)) + min];
        text.innerHTML = `${this.ennemyActive.name} uses ${ennemyMove.name}`;
        this.attack(this.pokemonActive, ennemyMove, "player");
        break;

      case 5:
        targetElem = (document.querySelector(`.${param} .sprite`) as HTMLElement);
        progress = (document.querySelector(`.${param} .progress`) as HTMLElement);

        if (param == "player") {
          this.pokemonActive.ko = true;
          text.innerHTML = `${this.pokemonActive.name} is ko`;
          for (const pokemon of this.team.pokemons) {
            if (!pokemon.ko) {
              this.pokemonActive = pokemon;
            }
          }
        } else {
          this.ennemyActive.ko = true;
          text.innerHTML = `${this.ennemyActive.name} is ko`;
          for (const pokemon of this.ennemyTeam.pokemons) {
            if (!pokemon.ko) {
              this.ennemyActive = pokemon;
            }
          }
        }

        if (this.pokemonActive.ko != true && this.ennemyActive.ko == true) {
          this.main(this.actions.win);
          return;
        } else if (this.pokemonActive.ko == true && this.ennemyActive.ko != true) {
          this.main(this.actions.loose);
          return;
        }

        setTimeout(() => {
          if (param == "player") {
            text.innerHTML = ` ${this.pokemonActive.name} enters the arena`;
          } else {
            text.innerHTML = ` ${this.ennemyActive.name} enters the arena`;
          }
        }, 1500);

        progress.style.width = "100%";
        targetElem.classList.remove('ko');
        this.main(this.actions.endTurn);
        break;

      case 6:
        text.innerHTML = `Congratulations, you win the fight.`;

        break;

      case 7:
        text.innerHTML = `You lost the fight. Try again.`;

        break;

      case 8:
        text.innerHTML = `Choice of action`;
        moves.forEach((input) => {
          input.style.pointerEvents = "all";
        });
        pokemonCards.forEach((input) => {
          input.style.pointerEvents = "all";
        });
        break;
    }
  }

  getEnnemies() {
    for (let i = 0; i < 3; i++) {
      this.pokemonsService.getPokemon(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * (150 - 1)) + 1}/`).subscribe(data => {
        let poke: Pokemon = {
          id: i,
          name: data.name,
          hp: data.stats[0].base_stat,
          maxHp: data.stats[0].base_stat,
          speed: data.stats[5].base_stat,
          sprites: data.sprites,
          moves: data.moves.slice(0, 4),
          isAttacked: false
        };
        this.ennemyTeam.pokemons.push(poke);
        if (i == 2) {
          this.getMoves(this.ennemyTeam.pokemons);
          this.ennemyActive = this.ennemyTeam.pokemons[0];
        }
      })
    }
  }

  getTeam() {
    this.route.queryParams.subscribe(params => {
      let id = params['teamId'];
      this.teamService.getTeam(id).subscribe(data => {
        this.team.pokemons = data.pokemons;
        this.getMoves(this.team.pokemons);
        this.pokemonActive = this.team.pokemons[0];
      });
    });
  }

  getMoves(team: Array<Pokemon>): any {
    for (const pokemon of team) {
      for (let index = 0; index < pokemon.moves.length; index++) {
        this.pokemonsService.getMove(pokemon.moves[index].move.url).subscribe(data => {
          let move = {
            'pp': data.pp,
            'name': data.name,
            'accuracy': data.accuracy,
            'power': data.power
          };

          pokemon.moves[index] = move;
        });
      }
    }
  }

  attack(target: Pokemon, move: any, className: string) {
    if (move.pp <= 0) return;
    move.pp -= 1;

    let targetElem = (document.querySelector(`.${className} .sprite`) as HTMLElement);
    let progress = (document.querySelector(`.${className} .progress`) as HTMLElement);

    let damage = move.power;
    if (damage == NaN) {
      damage = 0;
    }
    target.hp -= Math.ceil(damage / 2);
    let hp = (target.hp / target.maxHp) * 100;

    if (hp <= 0) {
      progress.style.width = "0%";
      targetElem.classList.add("ko");
      target.hp = 0;
      setTimeout(() => {
        this.main(this.actions.ko, className);
      }, 1500);
      return;
    }

    targetElem.classList.add("damage");
    progress.style.width = `${hp}%`;

    setTimeout(() => {
      targetElem.classList.remove("damage");
      if (this.pokemonActive.isAttacked && !this.ennemyActive.isAttacked) {
        this.main(this.actions.ennemyAttack);
      } else if (this.ennemyActive.isAttacked && !this.pokemonActive.isAttacked) {
        this.main(this.actions.pokemonAttack);
      } else {
        this.main(this.actions.endTurn);
      }
    }, 1500);
  }

  leave() {
    if (confirm("Are you sure ?")) {
      this.router.navigate([""]);
    }
  }
}

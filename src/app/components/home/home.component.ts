import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/class/Pokemon';
import {PokemonsService} from "../../services/pokemons.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  line1: Array<any> = [];
  line2: Array<any> = [];
  line3: Array<any> = [];
  line4: Array<any> = [];

  constructor(private pokemonsService:PokemonsService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    for (let i = 0; i < 40; i++) {
      let rand = Math.floor(Math.random() * (800 - 1) + 1);
      this.pokemonsService.getPokemon(`https://pokeapi.co/api/v2/pokemon/${rand}`).subscribe(data => {
        if (i < 10) {
          this.line1.push(data);
        } else if (i < 20) {
          this.line2.push(data);
        } else if (i < 30) {
          this.line3.push(data);
        } else  {
          this.line4.push(data);
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
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
    let rand = Math.floor(Math.random() * (600 - 1) + 1);
    for (let i = rand; i < rand+40; i++) {
      this.pokemonsService.getPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`).subscribe(data => {
        if (i < rand + 10) {
          this.line1.push(data);
        } else if (i < rand + 20) {
          this.line2.push(data);
        } else if (i < rand+30) {
          this.line3.push(data);
        } else  {
          this.line4.push(data);
        }
      });
    }
  }
}

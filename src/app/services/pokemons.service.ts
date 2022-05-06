import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Pokemon} from "../class/Pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http:HttpClient) { }

  getAll()
  {
    let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150";
    return this.http.get<any>(url);
  }

  getPokemon(url: string)
  {
    return this.http.get<any>(url);
  }

  getMove(url: string) {
    return this.http.get<any>(url);
  }
}

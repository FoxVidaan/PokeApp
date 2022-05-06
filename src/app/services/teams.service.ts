import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Team} from "../class/Team";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  url: string = "http://localhost:3000/teams";

  constructor(private http:HttpClient) { }

  getData() {
      return this.http.get<Array<Team>>(this.url);
  }

  getTeam(id: number) {
    return this.http.get<Team>(this.url+`/${id}`);
  }

  addData(data: Team) {
      return this.http.post<Team>(this.url, data)
  }

  delete(id: number) {
    return this.http.delete(this.url+`/${id}`)
  }
}

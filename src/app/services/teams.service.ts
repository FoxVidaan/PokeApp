import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Team} from "../class/Team";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  url: string = "http://localhost:3000/teams";
  baseurl: string = `${environment.apiUrl}/teams`;
  constructor(private http:HttpClient) { }

  getData() {
      return this.http.get<Array<Team>>(this.baseurl);
  }

  getTeam(id: number) {
    return this.http.get<Team>(`${this.baseurl}/${id}`)
  }

  addData(data: Team) {
      return this.http.post<Team>(this.baseurl, data);
  }

  delete(id: number) {
    return this.http.get<Team>(`${this.baseurl}/${id}`);
  }
}

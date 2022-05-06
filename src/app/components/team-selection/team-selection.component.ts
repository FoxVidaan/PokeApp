import { Component, OnInit } from '@angular/core';
import {Team} from "../../class/Team";
import {TeamsService} from "../../services/teams.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.scss']
})
export class TeamSelectionComponent implements OnInit {
  teams: Array<Team> = [];

  constructor(private teamsService: TeamsService, private router: Router) {
    this.teamsService.getData().subscribe(data => {
      this.teams = data;
    });
  }

  ngOnInit(): void {
  }

  choose(id: any) {
    this.router.navigate(["play"], { queryParams: { teamId: id}})
  }
}

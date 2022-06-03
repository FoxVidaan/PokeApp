import {Component, OnInit} from '@angular/core';
import {Team} from "../../class/Team";
import {TeamsService} from "../../services/teams.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: Array<Team> = [];
  isEmpty: boolean = false;

  constructor(private teamsService: TeamsService, private router: Router) {
    this.teamsService.getData().subscribe(data => {
      this.teams = data;
      if(null == this.teams){
        this.isEmpty = true;
      }
    });
  }

  ngOnInit(): void {
  }

  delete(id: number) {
    if (confirm("Are you sure ?")){
      this.teamsService.delete(id).subscribe(data => {
        location.reload();
      });
    }
  }
}

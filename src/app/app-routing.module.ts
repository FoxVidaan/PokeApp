import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {TeamsComponent} from "./components/teams/teams.component";
import {NewTeamComponent} from "./components/new-team/new-team.component";
import {TeamSelectionComponent} from "./components/team-selection/team-selection.component";
import {PlayComponent} from "./components/play/play.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "teams",
    component: TeamsComponent
  },
  {
    path: "teams/new",
    component: NewTeamComponent
  },
  {
    path: "team-selection",
    component: TeamSelectionComponent
  },
  {
    path: "play",
    component: PlayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

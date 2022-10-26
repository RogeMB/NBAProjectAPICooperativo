import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { TeamsDetailComponent } from './components/teams/teams-detail/teams-detail.component';
import { TeamsComponent } from './components/teams/teams.component';

const routes: Routes = [
  {path: 'players', component:PlayerListComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'teamsdetails/:year/:teamid', component: TeamsDetailComponent},
  {path: 'player-details/:anio/:id', component:PlayerDetailsComponent},
  {path: 'landing', component:LandingComponent},

  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

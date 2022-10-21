import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

const routes: Routes = [
  {path: 'players', component:PlayerListComponent},
  {path: 'landing', component:LandingComponent},
  {path: '', redirectTo:"/landing",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

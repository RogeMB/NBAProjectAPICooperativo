import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { TeamDetails } from 'src/interfaces/teams.interface';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamUrl : string = 'https://cdn.nba.com/logos/nba/';
  teamList: TeamDetails[] = []
  year: number = 0;
  id: number = 0;
  yearList: number[] = []
  prueba:string = ''

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();

    this.teamsService.getTeams(this.year).subscribe(response =>
      this.teamList = response.league.standard.sort())

    for (let i = 0; i < 7; i++) {
      this.yearList.push(this.year-i);
    }
  }

  putYear(){
    this.teamsService.getTeams(this.year).subscribe(response =>
      this.teamList = response.league.standard)
  }

  getPhotoUrl(team: TeamDetails): string{
      return `${this.teamUrl}${team.teamId}/global/L/logo.svg`;
  }

  onImgError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src = '../../../assets/img/teamnotfound.jpg';
  }

  onActivate(event: Event) {
    window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
     });
 }

}

import { Component, Input, OnInit } from '@angular/core';
import { TeamDetails } from 'src/app/Interfaces/teams.interface';

@Component({
  selector: 'app-team-single-card',
  templateUrl: './team-single-card.component.html',
  styleUrls: ['./team-single-card.component.css']
})
export class TeamSingleCardComponent implements OnInit {

  @Input() team: TeamDetails = {} as TeamDetails;
  @Input() year: number = 0;
  @Input() campoBusqueda: string = '';
  teamUrl: string = 'https://cdn.nba.com/logos/nba/';

  constructor() { }

  ngOnInit(): void {

  }
  getLogoUrl(team: TeamDetails): string{
    return `${this.teamUrl}${team.teamId}/global/L/logo.svg`;
}

  onImgError(event: ErrorEvent) {
  (event.target as HTMLImageElement).src = '../../../assets/img/teamnotfound.jpg';
}

}

import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { TeamDetails } from 'src/app/Interfaces/teams.interface';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamUrl : string = 'https://cdn.nba.com/logos/nba/';
  teamList: TeamDetails[] = []
  year: number = 0;
  yearList: number[] = []
  prueba:string = ''
  scrollBar: any;

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {

    this.getSeason(this.year);
    this.scrollingInTheDeep(this.scrollBar);
  }

  putYear(){
    this.teamsService.getTeams(this.year).subscribe(response =>
      this.teamList = response.league.standard);
  }

  getSeason(year: number) {
    this.year = new Date().getFullYear();

    this.teamsService.getTeams(this.year).subscribe(response =>
      this.teamList = response.league.standard.sort());

    for (let i = 0; i < 7; i++) {
      this.yearList.push(this.year-i);
    }
  }

  getLogoUrl(team: TeamDetails): string{
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

  scrollingInTheDeep(scroll_indicator: any) {
    scroll_indicator = document.getElementById("scroll-indicator");
    window.addEventListener("scroll", function () {
    const maxScrollHeight = document.body.scrollHeight - window.innerHeight;

    const currentScrollHeight = (window.scrollY / maxScrollHeight) * 100;
    scroll_indicator.style.width = `${currentScrollHeight}%`;
    });
  }
}

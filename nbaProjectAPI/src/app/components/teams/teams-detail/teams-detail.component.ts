import { Component, OnInit } from '@angular/core';
import { TeamsDetailService } from 'src/app/services/teams-detail.service';
import { TeamsService } from 'src/app/services/teams.service';
import { TeamDetails } from 'src/app/Interfaces/teams.interface';
import { CoachsService } from 'src/app/services/coachs.service';
import { RosterDetail } from 'src/app/Interfaces/teams-roster.interface';
import { Coachs } from 'src/app/Interfaces/coach.interface';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';
import { Player, Team } from 'src/app/Interfaces/player.interface';





@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent implements OnInit {
  
  teamUrl : string = 'https://cdn.nba.com/logos/nba/';
  coachUrl: string = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190';
  playerUrl: string = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190';
  coachesList: Coachs[] = [];
  year: number = 2022;
  teamList: TeamDetails[] = [];
  playersList: RosterDetail [] = [];
  teamID: String = {} as String;
  yearList: number [] = [];
  scrollBar: any;
  teamSelected: TeamDetails = {} as TeamDetails;
  coachSelected: Coachs = {} as Coachs;
  idTeamLink: String= {} as String;
  yearLink = new Date().getFullYear();
  playerList2: Player [] = [];

  constructor(private route: ActivatedRoute, private playerService: PlayersService, private teamsService: TeamsService, private rosterService: TeamsDetailService, private coachService: CoachsService) { }

  ngOnInit(): void {

    this.getParams();
    this.scrollingInTheDeep(this.scrollBar);
    this.getTeam();

    /*
    this.teamsService.getTeams(this.year).subscribe(response =>{
      this.teamList = response.league.standard;
      this.coachService.getTeamCoach(this.year).subscribe(response =>{
        this.coachesList = response.league.standard;
        this.rosterService.getTeamRoster(this.year, this.teamID).subscribe(response =>{
          this.playersList.push(response.league.standard);
        })
      })
    })
    console.log(this.teamList);
    console.log(this.coachesList);
    console.log(this.playersList);
    */
  }
  

  getParams(){
    this.route.params.subscribe(params => {        
      this.yearLink = params ['year'];
      this.idTeamLink = params ['teamid'];
    });
  }

  putYear(){
    this.teamsService.getTeams(this.year).subscribe(response =>
      this.teamList = response.league.standard);
  }
  
  getTeam() {
    this.teamsService.getTeams(this.year).subscribe(response => {
      this.teamList = response.league.standard;
      
      this.teamList.forEach(team => {
        if(this.teamID == team.teamId) {
          this.teamSelected = team;
        }
      });  
    });
  }
  
  getTeamDetails(year: number) {
    this.teamsService.getTeams(this.year).subscribe(response =>
      this.teamList = response.league.standard);

      this.teamList.forEach(team => {
        if (team.teamId == this.idTeamLink){
          this.teamSelected = team;
        }
      });
  }


  getCoach(year: number) {
    this.coachService.getTeamCoach(this.year).subscribe(response =>{
      this.coachesList = response.league.standard;

      this.coachesList.forEach(coach => {
        if(coach.teamId == this.idTeamLink && !coach.isAssistant){
          this.coachSelected = coach;
        }
      });
    });
  }

  getRosterTeam(year: number, teamID: string) {
    this.rosterService.getTeamRoster(this.year, String(this.idTeamLink)).subscribe(rosterResponse => {
      this.playerService.getPlayers(String(this.year)).subscribe(playersResponse => {
        this.playerList2 = playersResponse.league.standard.filter(player => 
          rosterResponse.league.standard.players.map(playersList=> playersList.personId).includes(player.personId));
        });
    });
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

  getLogoUrl(): string{
    return `${this.teamUrl}${this.idTeamLink}/global/L/logo.svg`;
  }

  getFotoCoach(coach: Coachs) {
    let coachId = coach.personId;
    return `${this.coachUrl}/${coachId}.png`;
  }

  getFotoPlayer(playerId: string) {
    return `${this.playerUrl}/${playerId}.png`;
  }

  onImgError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src = '../../../assets/img/teamnotfound.jpg';
  }

}

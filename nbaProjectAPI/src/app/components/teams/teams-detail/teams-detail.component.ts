import { Component, OnInit } from '@angular/core';
import { TeamsDetailService } from 'src/app/services/teams-detail.service';
import { TeamsService } from 'src/app/services/teams.service';
import { TeamDetails } from 'src/app/Interfaces/teams.interface';
import { CoachsService } from 'src/app/services/coachs.service';
import { RosterDetail } from 'src/app/Interfaces/teams-roster.interface';
import { Coachs } from 'src/app/Interfaces/coach.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/app/Interfaces/player.interface';





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
  year: number = 0;
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
  scroll_bar: any;

  constructor(private route: ActivatedRoute, private _router: Router, private playerService: PlayersService, private teamsService: TeamsService, private rosterService: TeamsDetailService, private coachService: CoachsService) { 
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {

    /*this.teamID = String(this.route.snapshot.paramMap.get('teamid'))*/
    this.getParams();
    this.scrollingInTheDeep(this.scrollBar);
    
    this.getSeason(this.yearLink);
    this.getTeam();
    this.getCoach(this.yearLink);
    this.getRosterTeam(this.yearLink, this.idTeamLink);


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

  getSeason(year: number) {
    this.year = new Date().getFullYear();

    this.teamsService.getTeams(this.year).subscribe(response =>
      this.teamList = response.league.standard.sort());
    for (let index = 0; index < 7; index++) {
      this.yearList.push(this.year-index);
    }
  }

  putYear(){
    this._router.navigate(['/teamsdetails', this.yearLink, this.idTeamLink])
  }

  getTeam() {
    this.teamsService.getTeams(this.yearLink).subscribe(response => {
      this.teamList = response.league.standard;

      this.teamList.forEach(team => {
        if(this.idTeamLink == team.teamId) {
          this.teamSelected = team;
        }
      });
    });
  }

  getCoach(year: number) {
    this.coachService.getTeamCoach(year).subscribe(response =>{
      this.coachesList = response.league.standard;

      this.coachesList.forEach(coach => {
        if(coach.teamId == this.idTeamLink && !coach.isAssistant){
          this.coachSelected = coach;
        }
      });
    });
  }

  getRosterTeam(year: number, teamID: String) {
    this.rosterService.getTeamRoster(year, String(teamID)).subscribe(rosterResponse => {
      this.playerService.getPlayers(String(year)).subscribe(playersResponse => {
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

  getFotoCoach(coachId: string) {
    return `${this.coachUrl}/${coachId}.png`;
  }

  getFotoPlayer(playerId: string) {
    if(!playerId)
      return this.onImgError;
      else{
        return `${this.playerUrl}/${playerId}.png`;
      }
  }

  onImgError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src = '../../../assets/img/teamnotfound.jpg';
  }

}

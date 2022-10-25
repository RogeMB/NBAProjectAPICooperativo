import { Component, OnInit } from '@angular/core';
import { TeamsDetailService } from 'src/app/services/teams-detail.service';
import { TeamsService } from 'src/app/services/teams.service';
import { TeamDetails } from 'src/app/Interfaces/teams.interface';
import { MatTableDataSource } from '@angular/material/table';
import { CoachsService } from 'src/app/services/coachs.service';
import { RosterDetail, TeamsRosterResponse } from 'src/app/Interfaces/teams-roster.interface';
import { Coachs } from 'src/app/Interfaces/coach.interface';







@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent implements OnInit {

  coachesList: Coachs[] = [];
  year: number = 2022;
  teamList: TeamDetails[] = [];
  playersList: RosterDetail[] = [];
  teamID: string = '1610612737';

  constructor(private teamsService: TeamsService, private rosterService: TeamsDetailService, private coachService: CoachsService) { }

  ngOnInit(): void {

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

    const scroll_indicator: any = document.getElementById("scroll-indicator");

    window.addEventListener("scroll", function () {
    const maxScrollHeight = document.body.scrollHeight - window.innerHeight;

    const currentScrollHeight = (window.scrollY / maxScrollHeight) * 100;
    scroll_indicator.style.width = `${currentScrollHeight}%`;
    });
  }

  onActivate(event: Event) {
    window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
    });
  }
}

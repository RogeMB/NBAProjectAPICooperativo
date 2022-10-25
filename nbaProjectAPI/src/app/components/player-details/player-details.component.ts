import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/Interfaces/player.interface';
import { CareerSummary } from 'src/app/Interfaces/playerInfo.interface';
import { TeamDetails } from 'src/app/Interfaces/teams.interface';
import { PlayersService } from 'src/app/services/players.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
})
export class PlayerDetailsComponent implements OnInit {
  anio = '';
  idPlayer = '';
  player: Player = {} as Player;
  listaCompleta: Player[] = [];
  listaCompleta2: Player[] = [];
  playerInfo: CareerSummary = {} as CareerSummary;
  listadoEquipos: TeamDetails[] = [];
  anios: string[] = ['2016', '2017', '2018', '2019', '2020', '2021', '2022'];
  listadoEquiposPlayer: TeamDetails[] = [];

  constructor(
    private playerService: PlayersService,
    private ruta: Router,
    private teamService: TeamsService
  ) { }

  ngOnInit(): void {
    this.playerService.getPlayers(this.getAnio()).subscribe((resp) => {
      this.listaCompleta = resp.league.standard;

      for (let it of this.listaCompleta) {
        if (it.personId == this.getId()) {
          this.player = it;
        }
      }

      for (let i = 0; i < this.anios.length; i++) {
        this.playerService.getPlayers(this.anio[i]).subscribe((a)=>{
          this.listaCompleta2 = a.league.standard
        })
        this.teamService.getTeams(Number(this.anio[i])).subscribe((a)=>{
          this.listadoEquipos = a.league.standard
        })

        for (let it of this.listaCompleta2) {
          if (it.teamId == this.listadoEquipos[i].teamId) {
            this.listadoEquiposPlayer.push(this.listadoEquipos[i])
          }
        }
      }
    });

    this.playerService.getPlayerInfo(this.getAnio(), this.getId()).subscribe((resp) => {
      this.playerInfo = resp.league.standard.stats.careerSummary;
    });

    // for (let index = 0; index < this.anios.length; index++) {
    //   this.teamService.getTeams(Number(this.anios[index])).subscribe((resp) => {
    //     this.listadoEquipos = resp.league.standard;
    //     for (let i of this.listadoEquipos) {
    //       if (i.teamId == this.player.teamId) {
    //         this.listadoEquiposPlayer.push(i);

    //       }

    //     }

    //   });

    //
  }

    getFotoPlayer() {
      return `https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/${this.getId()}.png`;
    }

    getAnio() {
      return this.ruta.url.split('/')[2];
    }

    getId() {
      return this.ruta.url.split('/')[3];
    }

    getFotoTeamPlayer(p: Player): string {
      return `https://cdn.nba.com/logos/nba/${this.player.teamId}/global/L/logo.svg`;
    }
  }

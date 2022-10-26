import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player, Team } from 'src/app/Interfaces/player.interface';
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

  listaCompletaPorAnio: Player[] = [];
  playerInfo: CareerSummary = {} as CareerSummary;
  listadoEquipos: TeamDetails[] = [];
  anios: string[] = ['2016', '2017', '2018', '2019', '2020', '2022'];
  listadoEquiposPlayer: TeamDetails[] = [];
  playerLocalizado: Player = {} as Player;
  teamLocalizado!: string;

  constructor(
    private playerService: PlayersService,
    private ruta: Router,
    private teamService: TeamsService
  ) {}

  ngOnInit(): void {
    this.idPlayer = this.ruta.url.split('/')[3];
    this.getPlayer();
    this.getPlayerInfo();
  }
  getCarrera() {
    //METODO PARA SACAR LA CARRERA
    for (let a = 0; a < this.anios.length; a++) {
      //recorro los años
      //saco los equipos de cada año
      this.teamService.getTeams(Number(this.anios[a])).subscribe(resp => {
        this.listadoEquipos = resp.league.standard;
        //Recorro la lista de equipos del jugador
        for (let equipo of this.player.teams) {
          this.teamLocalizado = equipo.teamId;
          //Recorro el listado de equipos por año
          for (let i of this.listadoEquipos) {
            //Compruebo que el id del equipo coincida con el de la lista de equipos de jugador
            if (this.teamLocalizado == i.teamId) {
              console.log(this.anios[a], this.teamLocalizado);
              //compruebo si está en el listado de equipos del jugador
              if (!this.listadoEquiposPlayer.includes(i))
                this.listadoEquiposPlayer.push(i);
            }
          }
        }
        console.log(this.listadoEquiposPlayer);
      });
    }
  }
  //sacar jugador
  getPlayer() {
    this.playerService.getPlayers(this.getAnio()).subscribe((resp) => {
      this.listaCompleta = resp.league.standard;
      for (let it of this.listaCompleta) {
        if (it.personId == this.idPlayer) {
          this.player = it;
        }
      }
      this.getCarrera();
    });
  }

  getPlayerInfo() {
    this.playerService
      .getPlayerInfo(this.getAnio(), this.idPlayer)
      .subscribe((resp) => {
        this.playerInfo = resp.league.standard.stats.careerSummary;
      });
  }

  getFotoPlayer(): string {
    return `https://ak-static.cms.nba.com/wp-content/uploads/silos/nba/latest/440x700/${this.idPlayer}.png`;
  }

  getAnio(): string {
    return this.ruta.url.split('/')[2];
  }

  getFotoTeamPlayer(p: Player): string {
    return `https://cdn.nba.com/logos/nba/${this.player.teamId}/global/L/logo.svg`;
  }

  /*
    getTeamsPlayer(lista: Team[]){
    for (let equipo of lista) {
      for (let i of this.listadoEquipos) {
        if (equipo.teamId== i.teamId) {
          if(this.listadoEquiposPlayer.length == 0){
            this.listadoEquiposPlayer.push(i)
          }else if(!this.listadoEquiposPlayer.includes(i))
            this.listadoEquiposPlayer.push(i)
        }
      
             }
      }
        return this.listadoEquiposPlayer
    } 
  */

  //       console.log(this.listadoEquiposPlayer);

  // for (let index = 0; index < this.anios.length; index++) {
  //   this.teamService.getTeams(Number(this.anios[index])).subscribe((resp) => {
  //     this.listadoEquipos = resp.league.standard;
  //     for (let i of this.listadoEquipos) {
  //       if (i.teamId == this.player.teamId) {
  //         this.listadoEquiposPlayer.push(i);

  //
  //

  // ;

  //
}

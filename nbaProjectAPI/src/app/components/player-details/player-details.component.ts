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
  playerInfo: CareerSummary = {} as CareerSummary;
  listadoEquipos: TeamDetails[] = [];

  constructor(
    private playerService: PlayersService,
    private ruta: Router,
    private teamService: TeamsService
  ) {}

  ngOnInit(): void {
    this.playerService.getPlayers(this.getAnio()).subscribe((resp) => {
      this.listaCompleta = resp.league.standard;

      for (let it of this.listaCompleta) {
        if (it.personId == this.getId()) {
          this.player = it;
        }
      }
    });
    this.playerService
      .getPlayerInfo(this.getAnio(), this.getId())
      .subscribe((resp) => {
        this.playerInfo = resp.league.standard.stats.careerSummary;
      });
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

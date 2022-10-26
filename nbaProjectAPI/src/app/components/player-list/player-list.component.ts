import { Component, OnInit } from '@angular/core';
import { Player, Team } from 'src/app/Interfaces/player.interface';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit {
  anios: string[] = ['2016','2017','2018','2019','2020','2022'];
  listaCompleta: Player[] = [];
  listaOeste: Player[] = [];
  listaEste: Player[] = [];
  anio = '2022';
  teamId: string = '';
  constructor(private playerService: PlayersService) { }

  ngOnInit(): void {
    this.playerService.getPlayers(this.anio).subscribe(resp => {
      this.listaCompleta = resp.league.standard;
    });
  }

  getFotoPlayer(p: Player) {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${p.personId}.png`;
  }

  getPlayersAnioEspecifico() {
    this.playerService.getPlayers(this.anio).subscribe(resp => {
      this.listaCompleta = resp.league.standard ;
    });

  }

  getFotoTeamPlayer(p: Player): string{
    return `https://cdn.nba.com/logos/nba/${p.teamId}/global/L/logo.svg`
   }
}

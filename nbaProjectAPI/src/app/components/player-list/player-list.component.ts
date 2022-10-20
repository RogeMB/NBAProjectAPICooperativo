import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/Interfaces/player.interface';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

listaCompleta: Player[] = []
listaOeste: Player[] = []
listaEste: Player[] = []

  constructor(private playerService: PlayersService) { }

  ngOnInit(): void {
    this.playerService.getPlayers("2022").subscribe(resp=>{
      this.listaCompleta = resp.league.standard
    })
  }


}

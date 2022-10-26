import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/Interfaces/player.interface';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {

@Input() player: Player = {} as Player;

@Input() anio!: String;


  constructor() { }

  ngOnInit(): void {
  }
  getFotoPlayer(p: Player) {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${p.personId}.png`;
  }

  getFotoTeamPlayer(p: Player){
    return `https://cdn.nba.com/logos/nba/${p.teamId}/global/L/logo.svg`
   }



}

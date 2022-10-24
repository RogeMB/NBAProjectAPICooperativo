import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {PlayerResponse } from '../Interfaces/player.interface';
import { environment } from 'src/environments/environment';
import { PlayerInfo } from '../Interfaces/playerInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

public getPlayers(fecha:string): Observable<PlayerResponse>{
  return this.http.get<PlayerResponse>(`${environment.API_BASE_URL}/${fecha}/players.json`)
}

public getPlayerInfo(year: string, id:string){
  return this.http.get<PlayerInfo>(`${environment.API_BASE_URL}/${year}/players/${id}_profile.json`)
}



}


import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {PlayerResponse } from '../Interfaces/player.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

public getPlayers(fecha:string): Observable<PlayerResponse>{
  return this.http.get<PlayerResponse>(`${environment.API_BASE_URL}/${fecha}/players.json`)
}




}


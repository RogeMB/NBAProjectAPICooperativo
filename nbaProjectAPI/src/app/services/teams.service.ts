import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TeamsResponse } from 'src/app/Interfaces/teams.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient)  { }

  getTeams(year:string): Observable<TeamsResponse>{
    return this.http.get<TeamsResponse>(`${environment.API_BASE_URL}/${year}/teams.json`);
  }

}

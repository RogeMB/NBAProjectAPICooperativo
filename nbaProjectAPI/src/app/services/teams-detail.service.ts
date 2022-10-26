import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamsRosterResponse } from '../Interfaces/teams-roster.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsDetailService {

  constructor(private http: HttpClient) { }

  public getTeamRoster(year: number, teamName: string):Observable<TeamsRosterResponse>{
    return this.http.get<TeamsRosterResponse>(`${environment.API_BASE_URL}/${year}/teams/${teamName}/roster.json`);
  }
}

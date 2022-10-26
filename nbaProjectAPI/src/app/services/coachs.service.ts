import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoachResponse } from '../Interfaces/coach.interface';

@Injectable({
  providedIn: 'root'
})
export class CoachsService {

  constructor(private http: HttpClient) { }

  public getTeamCoach(year: number): Observable<CoachResponse>{
    return this.http.get<CoachResponse>(`${environment.API_BASE_URL}/${year}/coaches.json`);
  }
}

import { UserClosedTask } from './../_models/UserClosedTasks';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberClosedTasksByUserService {
  baseUrl = environment.apiUrl + 'Report/';

  constructor(private http: HttpClient) { }

  GetClosedTaskbyUser(startDate, endDate): Observable<UserClosedTask> {
    return this.http.get<UserClosedTask>(this.baseUrl + 'TasksClosedByUser/' + startDate + '/' + endDate);
  }

}

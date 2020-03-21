import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TaskSchedule } from '../_models/taskSchedule';

@Injectable({
  providedIn: 'root'
})
export class TaskScheduleService {
  baseUrl = environment.apiUrl + 'TaskSchedule';

  constructor(private http: HttpClient) { }

  // return an array of taskScehdule
  getTaskSchedule(): Observable<TaskSchedule[]> {
    return this.http.get<TaskSchedule[]>(this.baseUrl);
  }
}

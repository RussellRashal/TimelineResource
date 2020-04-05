import { TaskSchedule } from './../_models/taskSchedule';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

  putTaskSchedule(id: number, taskSchedule: TaskSchedule): Observable<TaskSchedule> {
    return this.http.put<TaskSchedule>(this.baseUrl + '/' + id, taskSchedule);
  }

  postTaskSchedule(taskSchedule: TaskSchedule): Observable<TaskSchedule> {
    return this.http.post<TaskSchedule>(this.baseUrl, taskSchedule);
  }

  getTaskSchedulesByStaffId(id): Observable<TaskSchedule[]> {
    return this.http.get<TaskSchedule[]>(this.baseUrl + '/' + id);
  }


}

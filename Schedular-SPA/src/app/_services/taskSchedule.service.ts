import { PaginatedResult } from './../_models/pagination';
import { TaskSchedule } from './../_models/taskSchedule';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskScheduleService {
  baseUrl = environment.apiUrl + 'TaskSchedule';
  // store paginated results in
  paginatedResult: PaginatedResult<TaskSchedule[]> = new PaginatedResult<TaskSchedule[]>();


  constructor(private http: HttpClient) { }

  // return an array of taskScehdule
  getTaskSchedules(): Observable<TaskSchedule[]> {
    return this.http.get<TaskSchedule[]>(this.baseUrl);
  }

  getTaskSchedule(id): Observable<TaskSchedule[]> {
    return this.http.get<TaskSchedule[]>(this.baseUrl + '/' + id);
  }

  getCalendarTaskScheduleByUserId(id): Observable<TaskSchedule[]> {
    return this.http.get<TaskSchedule[]>(this.baseUrl + '/byUser/' + id);
  }

  getTaskScheduleByUserId(id, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<TaskSchedule[]>(this.baseUrl + '/byUser/'
      + id, {observe: 'response', params}).pipe(
        map(response => {
          this.paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return this.paginatedResult;
        })
      );
  }

  getTaskScheduleOpenCloseByUserId(id: number, isClosed: boolean, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<TaskSchedule[]>(this.baseUrl + '/byUserOpenCloseTasks/' + id + '/'
      + isClosed, {observe: 'response', params}).pipe(
        map(response => {
          this.paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return this.paginatedResult;
        })
      );
  }

  putTaskSchedule(id, taskSchedule) {
    return this.http.put(this.baseUrl + '/' + id, taskSchedule);
    // return taskSchedule;
  }

  postTaskSchedule(taskSchedule) {
    return this.http.post(this.baseUrl + '/task', taskSchedule);
  }

  deleteTaskSchedule(id) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}

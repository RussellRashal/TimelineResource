import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from './../_models/pagination';
import { TaskSchedule } from './../_models/taskSchedule';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HoursWorkedService {
  baseUrl = environment.apiUrl + 'TaskSchedule';
    // store paginated results in
    paginatedResult: PaginatedResult<TaskSchedule[]> = new PaginatedResult<TaskSchedule[]>();

  constructor(private http: HttpClient) { }

  GetHoursWorked(id, startDate, endDate) {
    return this.http.get(this.baseUrl + '/hoursWorked/'
      + id + '/' + startDate + '/' + endDate);
  }

  GetTasksWithinHoursWorked(id, startDate, endDate, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<TaskSchedule[]>(this.baseUrl + '/tasksWithinHours/'
      + id + '/' + startDate + '/' + endDate, {observe: 'response', params}).pipe(
        map(response => {
          this.paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return this.paginatedResult;
        })
      );
  }

}



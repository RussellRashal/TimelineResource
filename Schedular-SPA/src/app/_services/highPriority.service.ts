import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from './../_models/pagination';
import { TaskSchedule } from './../_models/taskSchedule';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HighPriorityService {
  baseUrl = environment.apiUrl + 'Report/';
   // store paginated results in
   paginatedResult: PaginatedResult<TaskSchedule[]> = new PaginatedResult<TaskSchedule[]>();


  constructor(private http: HttpClient) { }

  GetHighPriorityTasksByTime(startDate, endDate, status: boolean, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<TaskSchedule[]>(this.baseUrl + 'HighPriorityTasks/'
      + startDate + '/' + endDate + '/' + status, {observe: 'response', params}).pipe(
        map(response => {
          this.paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return this.paginatedResult;
        })
      );
  }


  GetAllHighPriorityTasks(status: boolean, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<TaskSchedule[]>(this.baseUrl + 'HighPriorityTasks/' + status
      , {observe: 'response', params}).pipe(
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

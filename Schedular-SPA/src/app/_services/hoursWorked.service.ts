import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoursWorkedService {
  baseUrl = environment.apiUrl + 'TaskSchedule';

  constructor(private http: HttpClient) { }

  getHoursWorked(id, startDate, endDate) {
    return this.http.get(this.baseUrl + '/'
      + id + '/' + startDate + '/' + endDate);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TaskSchedule } from '../_models/taskSchedule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.apiUrl + 'TaskSchedule';

  constructor(private http: HttpClient) { }

  getEvents(idOfStaff) {
    return this.http.get(this.baseUrl + '/byStaff/' + idOfStaff)
                .toPromise()
                .then(res => res as any[])
                .then(data => data);
  }
}

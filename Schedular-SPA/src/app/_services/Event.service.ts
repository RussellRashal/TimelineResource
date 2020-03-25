import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class EventService {
  baseUrl = environment.apiUrl + 'TaskSchedule';


  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get(this.baseUrl)
                .toPromise()
                .then(res => res.json().data as any[])
                .then(data => data);
  }

}

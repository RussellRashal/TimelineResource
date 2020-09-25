import { TaskSchedule } from './../_models/taskSchedule';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskScheduleService {
  baseUrl = environment.apiUrl + 'TaskSchedule';


  constructor(private http: HttpClient) { }

  // return an array of taskScehdule
  getTaskSchedules(): Observable<TaskSchedule[]> {
    return this.http.get<TaskSchedule[]>(this.baseUrl);
  }

  getTaskScheduleByUserId(id): Observable<TaskSchedule[]> {
    return this.http.get<TaskSchedule[]>(this.baseUrl + '/byUser/' + id);
  }



  putTaskSchedule(id, taskSchedule) {
    return this.http.put(this.baseUrl + '/' + id, taskSchedule);
    // return taskSchedule;
  }

  postTaskSchedule(taskSchedule) {
    return this.http.post(this.baseUrl, taskSchedule);
  }

  deleteTaskSchedule(id) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

}

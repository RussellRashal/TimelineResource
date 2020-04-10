import { TaskScheduleService } from './../_services/taskSchedule.service';
import { TaskSchedule } from './../_models/taskSchedule';
import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TaskSchedularLoaderResolver implements Resolve<TaskSchedule> {

    constructor(
        private taskScheduleService: TaskScheduleService,
        private router: Router) {}

    // get staff json data
    resolve(route: ActivatedRouteSnapshot): Observable<TaskSchedule> {
        return this.taskScheduleService.getTaskSchedule(1).pipe(
            catchError(error => {
                console.log(error);
                return of(null);
            })
        );
    }
}

import { TaskScheduleService } from './../_services/taskSchedule.service';
import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StateStorageService } from '../_services/stateStorage.service';

@Injectable()
// tslint:disable-next-line: class-name
export class taskScheduleResolver implements Resolve<any> {

    constructor(
        private taskScheduleService: TaskScheduleService,
        private router: Router) {}

    // get staff json data
    resolve(route: ActivatedRouteSnapshot) {
        return this.taskScheduleService.getTaskSchedule(16).pipe(
            catchError(error => {
              console.log(error);
              return of(null);
            })
        );
    }
}


// route.params[`id`]

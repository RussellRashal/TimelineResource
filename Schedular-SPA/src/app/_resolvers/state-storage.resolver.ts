import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StateStorageService } from '../_services/stateStorage.service';

@Injectable()
// tslint:disable-next-line: class-name
export class stateStorageResolver implements Resolve<any> {

    constructor(
        private stateStorageService: StateStorageService,
        private router: Router) {}

    // get staff json data
    resolve(route: ActivatedRouteSnapshot) {
        return this.stateStorageService.getClickedOnUser();
    }
}

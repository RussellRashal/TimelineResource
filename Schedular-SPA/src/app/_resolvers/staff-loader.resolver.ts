import {Injectable} from '@angular/core';
import { StaffMemberModel } from '../_models/StaffMemberModel';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StaffMemberService } from '../_services/staffMember.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StaffLoaderResolver implements Resolve<StaffMemberModel> {

    constructor(
        private staffMemberService: StaffMemberService,
        private router: Router) {}

    // get staff json data
    resolve(route: ActivatedRouteSnapshot): Observable<StaffMemberModel> {
        return this.staffMemberService.getStaffs().pipe(
            catchError(error => {
                console.log(error);
                return of(null);
            })
        );
    }
}

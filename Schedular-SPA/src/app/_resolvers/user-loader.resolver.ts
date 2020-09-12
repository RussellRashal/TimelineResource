import {Injectable} from '@angular/core';
import { UserMemberModel } from '../_models/UserMemberModel';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserMemberService } from '../_services/userMember.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserLoaderResolver implements Resolve<UserMemberModel> {

    constructor(
        private userMemberService: UserMemberService,
        private router: Router) {}

    // get staff json data
    resolve(route: ActivatedRouteSnapshot): Observable<UserMemberModel> {
        return this.userMemberService.getUsers().pipe(
            catchError(error => {
                console.log(error);
                return of(null);
            })
        );
    }
}

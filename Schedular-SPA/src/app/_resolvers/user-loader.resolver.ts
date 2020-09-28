import {Injectable} from '@angular/core';
import { UserMemberModel } from '../_models/UserMemberModel';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserMemberService } from '../_services/userMember.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserLoaderResolver implements Resolve<UserMemberModel> {
    role;

    constructor(
        private userMemberService: UserMemberService,
        private router: Router) {}

    // get user in json data from API
    resolve(route: ActivatedRouteSnapshot): Observable<UserMemberModel> {
        this.role = JSON.parse(localStorage.getItem('role'));
        if (this.role === 'Admin' || this.role === 'Admin') {
            return this.userMemberService.getUsers().pipe(
                catchError(error => {
                    console.log(error);
                    return of(null);
                })
            );
        }
        else {
            return of(null);
        }
    }
}

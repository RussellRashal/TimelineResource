import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class RoleGuard implements CanActivate {
    role;
    constructor(
        private router: Router){}

    canActivate(): boolean {
        if (JSON.parse(localStorage.getItem('role')) === 'Admin'){
        return true;
        }
        alert('You are unauthorised to access this');
        this.router.navigate(['/calendarView']);
        return false;
    }
}

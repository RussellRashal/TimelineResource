import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router){}

  canActivate(): boolean {
    if ( this.authService.loggedIn()){
      return true;
    }
    alert('You are unauthorised to access this');
    this.router.navigate(['/login']);
    return false;
  }

}

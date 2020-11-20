import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './../_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.css']
})
export class SidebarNavigationComponent implements OnInit{
  customerType: string = environment.customerType;
  role;
  userAuthorised: boolean;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService ) {}

  ngOnInit() {
    this.role = JSON.parse(localStorage.getItem('role'));
    // if user is not a manager
    if (this.role !== 'Admin') {
      this.userAuthorised = false;
    } // if user is a manager
    else {
      this.userAuthorised = true;
    }
  }

   // has the user logged in
  loggedIn() {
    this.ngOnInit();
    return this.authService.loggedIn();
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    const username = localStorage.removeItem('user');
    const userId = localStorage.removeItem('role');
  }

}

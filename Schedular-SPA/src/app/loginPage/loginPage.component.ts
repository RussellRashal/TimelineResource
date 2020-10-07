import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

}

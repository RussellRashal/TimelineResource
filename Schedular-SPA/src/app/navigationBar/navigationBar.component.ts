import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigationBar.component.html',
  styleUrls: ['./navigationBar.component.css']
})
export class NavigationBarComponent implements OnInit {
  model: any = {};
  loginReactiveForm: FormGroup;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  login() {
    this.model.username = this.loginReactiveForm.value.username;
    this.model.password = this.loginReactiveForm.value.password;


    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      console.log('failed to login');
    });
  }

  initForm() {
    this.loginReactiveForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

}

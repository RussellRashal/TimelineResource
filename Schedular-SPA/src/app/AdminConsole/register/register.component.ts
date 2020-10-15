import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Combine: any;
  model;
  BookComplete: FormGroup;
  nullError: boolean;
  role;
  userAuthorised: boolean;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit() {
    this.alterForm();

    // get users role
    this.role = JSON.parse(localStorage.getItem('role'));
    // if user is not a manager
    if (this.role !== 'Admin') {
      this.userAuthorised = false;
    } // if user is a manager
    else {
      // list of users for the drop down
      this.userAuthorised = true;
    }

  }


  Register() {
    this.nullError = false;

    // below is the code to check if all of the boxes are completed
    if (this.BookComplete.value.firstname === '' ||
        this.BookComplete.value.lastName === '' ||
        this.BookComplete.value.Password === '' ||
        this.BookComplete.value.role === '') {
          this.nullError = true;
    }
    else {
      this.model = {
        Firstname: this.BookComplete.value.firstname,
        LastName: this.BookComplete.value.lastName,
        Password: this.BookComplete.value.Password,
        Role: this.BookComplete.value.role
      };

      this.authService.register(this.model).subscribe(next => {
        alert('Account Created');
      }, error => {
        console.log(error);
      });

      this.BookComplete.reset();
    }
  }

  alterForm() {
    this.BookComplete = new FormGroup({
      firstname: new FormControl(),
      lastName: new FormControl(),
      Password: new FormControl(),
      role: new FormControl()
    });
  }

  getNullError() {
    return this.nullError;
  }
}



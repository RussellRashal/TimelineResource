import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Combine: any;
  model: any = {};
  BookComplete: FormGroup;
  nullError: boolean;

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit() {
    this.alterForm();
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

    this.model.firstname = this.BookComplete.value.firstname;
    this.model.lastName = this.BookComplete.value.lastName;
    this.model.Password = this.BookComplete.value.Password;
    this.model.role = this.BookComplete.value.role;







  //  this.model.username = this.BookComplete.value.firstname + this.BookComplete.value.lastName;
    this.model.role = this.BookComplete.value.role;

    console.log(this.model);

    this.authService.register(this.model).subscribe(next => {
      console.log('Booked successfully');
   }, error => {
     console.log('error = ' + error);
   });


  }




  alterForm() {
    this.BookComplete = new FormGroup({
      firstname: new FormControl(),
      lastName: new FormControl(),
    //  username: new FormControl(),
      Password: new FormControl(),
      role: new FormControl()
    });
  }

  getNullError() {
    return this.nullError;
  }

}

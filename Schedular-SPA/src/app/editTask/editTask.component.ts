import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-edittask',
  templateUrl: './editTask.component.html',
  styleUrls: ['./editTask.component.css']
})
export class EditTaskComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    selectName: new FormControl(''),
    textAreaTest: new FormControl('')
  });
  constructor() { }


  ngOnInit() {
    this.updateName();
  }

  // use this to update the value in a form
  updateName() {
    this.profileForm.setValue({
      firstName: 'Michael',
      lastName: 'stephenson',
      selectName: 'Billy',
      textAreaTest: 'this is a test for the text area'
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // this.profileForm.value.lastName
    console.warn(this.profileForm.value);
    // post code goes in here
  }

}

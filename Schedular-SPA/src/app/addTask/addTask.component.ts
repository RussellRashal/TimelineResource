import { NoteService } from './../_services/note.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { StateStorageService } from '../_services/stateStorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskSchedule } from '../_models/taskSchedule';
import { TaskScheduleService } from '../_services/taskSchedule.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Note } from '../_models/note';



@Component({
  selector: 'app-add-task',
  templateUrl: './addTask.component.html',
  styleUrls: ['./addTask.component.css']
})
export class AddTaskComponent implements OnInit {
  // validation
  startHourInt;
  endHourInt;
  startMinuteInt;
  endMinuteInt;
  timingError: boolean;
  dateError: boolean;
  nullError: boolean;

  hourSelectors: string[] = [];
  minuteSelectors: string[] = [];
  userMemberModels;
  profileForm: FormGroup;
  returnedStartDateAndTime: string;
  returnedEndDateAndTime: string;
  postServiceTaskSchedule;
  currentUser;
  currentUserData;
  userAuthorised: boolean;
  role;
  postNote: Note;

  constructor(
    private stateStorageService: StateStorageService,
    private taskScheduleService: TaskScheduleService,
    private router: Router,
    private noteService: NoteService,
    public dialogRef: MatDialogRef<AddTaskComponent>) { }



  ngOnInit() {
    // get user from storageService
    // the below will put the name of the person who is logged in or had the button clicked onto the user name automatically
    this.currentUserData = this.stateStorageService.getClickedOnUser();

    this.role = JSON.parse(localStorage.getItem('role'));
    // if user is not a manager
    if (this.role !== 'Manager') {
      this.userAuthorised = false;
    } // if user is a manager
    else {
      // list of users for the drop down
      this.userMemberModels = this.stateStorageService.getUserMemberStorage();
      this.userAuthorised = true;
    }

    this.dropDownTimeList();
    this.initForm();
  }

  initForm() {
    this.profileForm = new FormGroup({
      userName: new FormControl(this.currentUserData.id),
      taskTextArea: new FormControl(''),
      startDate: new FormControl(new Date().toISOString().slice(0, 10)),
      startHourTime: new FormControl(''),
      startMinuteTime: new FormControl(''),
      endDate: new FormControl(new Date().toISOString().slice(0, 10)),
      endHourTime: new FormControl(''),
      endMinuteTime: new FormControl(''),
      noteInfo: new FormControl('')
    }, );
  }

  dropDownTimeList() {
    // minute creation
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        this.minuteSelectors[i] = '0' + i.toString();
      } else {
        this.minuteSelectors[i] = i.toString();
      }
    }
    // hour creation
    for (let i = 0; i < 24; i++) {
      this.hourSelectors[i] = i.toString();
    }
  }


  onSubmit() {
    // convert data to int to check if start date is greater than end date
    this.startHourInt = parseInt(this.profileForm.value.startHourTime);
    this.endHourInt = parseInt(this.profileForm.value.endHourTime);
    this.startMinuteInt = parseInt(this.profileForm.value.startMinuteTime);
    this.endMinuteInt = parseInt(this.profileForm.value.endMinuteTime);

    // reset validation values
    this.timingError = false;
    this.dateError = false;
    this.nullError = false;

    // check if values are filled out
    if (this.profileForm.value.startHourTime === '' ||
        this.profileForm.value.endHourTime === '' ||
        this.profileForm.value.startMinuteTime === '' ||
        this.profileForm.value.endMinuteTime === '' ||
        this.profileForm.value.taskTextArea === '' ||
        this.profileForm.value.userName === '' ||
        this.profileForm.value.noteInfo === '') {
          this.nullError = true;
    }
    else if (this.profileForm.value.startDate > this.profileForm.value.endDate) {
      // console.log('start date cannot be greater than end date');
      this.dateError = true;
    }
    else if (this.profileForm.value.startDate === this.profileForm.value.endDate &&
      this.startHourInt === this.endHourInt
      && this.startMinuteInt > this.endMinuteInt) {
        // console.log('start time cannot be greater than end time');
        this.timingError = true;
    }
    else if (this.profileForm.value.startDate === this.profileForm.value.endDate &&
      this.startHourInt > this.endHourInt) {
      // console.log('start time cannot be greater than end time');
      this.timingError = true;
    }
    else {
      // put date, hour and minute together to send to api
      this.returnedStartDateAndTime =
      this.profileForm.value.startDate.toString() + ' ' +
      this.profileForm.value.startHourTime.toString() + ':' +
      this.profileForm.value.startMinuteTime.toString();

      this.returnedEndDateAndTime =
        this.profileForm.value.endDate.toString() + ' ' +
        this.profileForm.value.endHourTime.toString() + ':' +
        this.profileForm.value.endMinuteTime.toString();

      // put data into an array for the api
      this.postServiceTaskSchedule = {
        title: this.profileForm.value.taskTextArea,
        start: this.returnedStartDateAndTime,
        end: this.returnedEndDateAndTime,
        userId: Number(this.profileForm.value.userName),
        notes: [{
          notesInfo: this.profileForm.value.noteInfo
        }]
      };

      // send data to api
      this.taskScheduleService.postTaskSchedule(this.postServiceTaskSchedule).subscribe(next => {
        console.log('success');
        // this.router.navigate(['/CalendarView']);
        // alert('Task has been added');
        this.dialogRef.close({event: 'Cancel'});
        }, error => {
          console.log('error, POST did not go through: ' + error);
      });
      // this.ngOnInit();

    // close dialog box after add button is clicked
    }
    // console.log(this.postServiceTaskSchedule);
  }

  // noteCreation() {
  //   this.postNote = {
  //     notesInfo: this.profileForm.value.noteInfo
  //   };
  //   this.noteService.postNote(this.postNote).subscribe(next => {
  //     console.log(next);
  //     }, error => {
  //       console.log(error);
  //   });
  // }

  closeButton() {
    this.dialogRef.close({event: 'Cancel'});
  }

  // validation checker for template div tags
  getDateError() {
    return this.dateError;
  }
  getTimingError() {
    return this.timingError;
  }
  getNullError() {
    return this.nullError;
  }

  // has the user logged in
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedOut() {
    const token = localStorage.removeItem('token');
    console.log('logged out');
  }

  authorised() {
    return this.userAuthorised;
  }
}

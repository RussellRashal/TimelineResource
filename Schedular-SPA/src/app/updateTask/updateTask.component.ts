import { Note } from './../_models/note';
import { NoteService } from './../_services/note.service';
import { element } from 'protractor';
import { UserMemberModel } from './../_models/UserMemberModel';
import { TaskSchedule } from '../_models/taskSchedule';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { TaskScheduleService } from '../_services/taskSchedule.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-task',
  templateUrl: './updateTask.component.html',
  styleUrls: ['./updateTask.component.css']
})

export class UpdateTaskComponent implements OnInit {
  // validation
  startHourInt;
  endHourInt;
  startMinuteInt;
  endMinuteInt;
  timingError: boolean;
  dateError: boolean;
  nullError: boolean;

  profileForm: FormGroup;
  notesForm: FormGroup;

  time = {hour: 13, minute: 30};
  taskScheduleData;
  currentUserData;
  userMemberModels;
  currentStartTimeDate;
  currentEndTimeDate;
  startDateConvert;
  endDateConvert;
  hourStartTimeConvert;
  minuteStartTimeConvert;
  hourEndTimeConvert;
  minuteEndTimeConvert;
  currentFullName: string;
  returnedStartDateAndTime: string;
  returnedEndDateAndTime: string;
  putServiceTaskSchedule;
  role;
  userAuthorised: boolean;
  notesArray: any[];
  postNote: Note;
  currentUserId;



  hourSelectors: string[] = [];
  minuteSelectors: string[] = [];

  constructor(
    private router: Router,
    private stateStorageService: StateStorageService,
    private datePipe: DatePipe,
    private taskScheduleService: TaskScheduleService,
    private noteService: NoteService,
    public dialogRef: MatDialogRef<UpdateTaskComponent>) {}


  ngOnInit() {
    this.taskScheduleData = this.stateStorageService.gettaskScheduleStorage();
    this.currentUserData = this.stateStorageService.getClickedOnUser();
    this.notesArray = this.taskScheduleData.notes;

    this.role = JSON.parse(localStorage.getItem('role'));
    // if user is not a manager
    if (this.role !== 'Manager') {
      this.userAuthorised = false;
      this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    } // if user is a manager
    else {
      // list of users for the drop down
      this.userMemberModels = this.stateStorageService.getUserMemberStorage();
      this.userAuthorised = true;
    }

    this.currentStartTimeDate = this.taskScheduleData.start;
    this.currentEndTimeDate = this.taskScheduleData.end;
    this.transformDate();

    this.dropDownTimeList();
    this.initForm();

  }


  initForm() {
    this.profileForm = new FormGroup({
      userName: new FormControl(this.currentUserData.id),
      title: new FormControl(this.taskScheduleData.title),
      startDate: new FormControl(this.startDateConvert),
      startHourTime: new FormControl(this.hourStartTimeConvert),
      startMinuteTime: new FormControl(this.minuteStartTimeConvert),
      endDate: new FormControl(this.endDateConvert),
      endHourTime: new FormControl(this.hourEndTimeConvert),
      endMinuteTime: new FormControl(this.minuteEndTimeConvert),
      newNote: new FormControl()
    });
  }


  // convert date into a usable format for the datepicker in the template

  transformDate() {
    // convert the date
    this.startDateConvert = this.datePipe.transform(this.currentStartTimeDate, 'yyyy-MM-dd');
    this.endDateConvert = this.datePipe.transform(this.currentEndTimeDate, 'yyyy-MM-dd');
    // convert the start time
    this.hourStartTimeConvert = this.datePipe.transform(this.currentStartTimeDate, 'H');
    this.minuteStartTimeConvert = this.datePipe.transform(this.currentStartTimeDate, 'mm');
    // convert the end time
    this.hourEndTimeConvert = this.datePipe.transform(this.currentEndTimeDate, 'H');
    this.minuteEndTimeConvert = this.datePipe.transform(this.currentEndTimeDate, 'mm');
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
    this.profileForm.value.title === '' ||
    this.profileForm.value.userName === '') {
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
      this.putServiceTaskSchedule = {
        title: this.profileForm.value.title,
        start: this.returnedStartDateAndTime,
        end: this.returnedEndDateAndTime,
        userId: Number(this.profileForm.value.userName)
      };

      // send data to api
      this.taskScheduleService.putTaskSchedule(
        this.taskScheduleData.id,
        this.putServiceTaskSchedule).subscribe(next => {
          console.log('success');
          this.router.navigate(['/CalendarView']);
          this.dialogRef.close({event: 'Cancel'}); // dialog box close
        }, error => {
          console.log('error POST did not go through: ' + error);
        });
    }
  }

  deleteTask() {
    console.log(this.taskScheduleData.id);
    this.taskScheduleService.deleteTaskSchedule(this.taskScheduleData.id).subscribe(next => {
      console.log('Deleted');
      this.router.navigate(['/CalendarView']);
      this.dialogRef.close({event: 'Cancel'}); // dialog box close
    }, error => {
      console.log('unable to delete');
    });
  }

  test() {
    // this.ngOnInit();
    window.location.reload();
  }

  noteCreation() {
    this.postNote = {
      notesInfo: this.profileForm.value.newNote,
      taskScheduleId: this.taskScheduleData.id
    };
    this.noteService.postNote(this.postNote).subscribe(next => {
      console.log(next);
      // this.ngOnInit();
      // window.location.reload();
      }, error => {
        console.log(error);
    });
  }

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

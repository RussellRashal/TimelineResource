import { UserMemberService } from './../_services/userMember.service';
import { Calendar } from '@fullcalendar/angular';
import { AttachmentService } from './../_services/attachment.service';
import { AttachmentComponent } from './../Attachment/Attachment.component';
import { Note } from './../_models/note';
import { NoteService } from './../_services/note.service';
import { element } from 'protractor';
import { UserMemberModel } from './../_models/UserMemberModel';
import { TaskSchedule } from '../_models/taskSchedule';
import { Component, OnInit, Inject, Optional, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateStorageService } from '../_services/stateStorage.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { TaskScheduleService } from '../_services/taskSchedule.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../_services/customer.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

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
  taskId;
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
  notesArray;
  postNote: Note;
  currentUserId;
  taskScheduleDataArray;
  taskScheduleData;
  testTask;
  isDataAvailable: boolean;
  userNameOfLastEdit;
  hourSelectors: string[] = [];
  minuteSelectors: string[] = [];
  attachmentArray;
  customers;
  customerType: string = environment.customerType;
  yearLastEdit;
  monthLastEdit;
  dayLastEdit;
  timeLastEdit;
  taskCreatedDay;
  taskCreatedMonth;
  taskCreatedYear;

  constructor(
    private router: Router,
    private stateStorageService: StateStorageService,
    private userMemberService: UserMemberService,
    private customerService: CustomerService,
    private datePipe: DatePipe,
    private taskScheduleService: TaskScheduleService,
    private attachmentService: AttachmentService,
    private noteService: NoteService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateTaskComponent>) {}


  ngOnInit() {
    this.isDataAvailable = false;
    this.taskId = this.stateStorageService.getTaskId();

    this.userMemberService.getUsers().subscribe((data) => {
      this.userMemberModels = data;
    }, error => {
      console.log(error);
    });


    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    }, error => {
      console.log(error);
    });

    this.displayTasks();
  }

  attachmentBox() {
    const dialogRef = this.dialog.open(AttachmentComponent, {
      width: '70%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      // reload the filenames that have been newly attached when the attachment box is closed
      this.displayTasks();
    });
  }

  displayTasks() {
    this.taskScheduleService.getTaskSchedule(this.taskId).subscribe((data) => {
      this.taskScheduleDataArray = data;
      this.isDataAvailable = true;
      this.taskScheduleData = this.taskScheduleDataArray[0];
      this.notesArray = this.taskScheduleData.notes;
      this.currentStartTimeDate = this.taskScheduleData.start;
      this.currentEndTimeDate = this.taskScheduleData.end;
      this.currentUserId = this.taskScheduleData.userCurrentAssignedId;
      this.yearLastEdit = this.taskScheduleData.userLastEditDate.toString().slice(0, 4);
      this.monthLastEdit = this.taskScheduleData.userLastEditDate.toString().slice(5, 7);
      this.dayLastEdit = this.taskScheduleData.userLastEditDate.toString().slice(8, 10);
      this.timeLastEdit = this.taskScheduleData.userLastEditDate.toString().slice(11, 16);

      this.taskCreatedYear = this.taskScheduleData.taskCreatedDate.toString().slice(0, 4);
      this.taskCreatedMonth = this.taskScheduleData.taskCreatedDate.toString().slice(5, 7);
      this.taskCreatedDay = this.taskScheduleData.taskCreatedDate.toString().slice(8, 10);


      this.stateStorageService.setAttachmentFileName(this.taskScheduleDataArray[0].attachments);
      this.attachmentArray = this.taskScheduleDataArray[0].attachments;
      this.transformDate();

      this.dropDownTimeList();
      this.initForm();
      this.userLastEdit();

      }, error => {
        console.log(error);
        this.isDataAvailable = false;
    });

  }


  initForm()
  {
    this.profileForm = new FormGroup({
      userName: new FormControl(this.currentUserId),
      title: new FormControl(this.taskScheduleData.title),
      startDate: new FormControl(this.startDateConvert),
      startHourTime: new FormControl(this.hourStartTimeConvert),
      startMinuteTime: new FormControl(this.minuteStartTimeConvert),
      endDate: new FormControl(this.endDateConvert),
      endHourTime: new FormControl(this.hourEndTimeConvert),
      endMinuteTime: new FormControl(this.minuteEndTimeConvert),
      newNote: new FormControl(),
      isClosed: new FormControl(this.taskScheduleData.isClosed),
      hasTimeLimit: new FormControl(this.taskScheduleData.hasTimeLimit),
      highPriority: new FormControl(this.taskScheduleData.highPriority),
      customer: new FormControl(this.taskScheduleData.customerId)
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

  dropDownTimeList()
  {
    // minute creation
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        this.minuteSelectors[i] = '0' + i.toString();
      }
      else {
        this.minuteSelectors[i] = i.toString();
      }
    }
    // hour creation
    for (let i = 1; i < 24; i++) {
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

    if (this.profileForm.value.title === '') {
      // values need to be filled out
      this.nullError = true;
    }
    else if (this.profileForm.value.hasTimeLimit === true){
      if (this.profileForm.value.startHourTime === null || this.profileForm.value.endHourTime === null ||
        this.profileForm.value.startMinuteTime === null || this.profileForm.value.endMinuteTime === null ||
        this.profileForm.value.startDate === null || this.profileForm.value.endDate === null ||
        this.profileForm.value.title === '') {
          // values need to be filled out
          this.nullError = true;
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

        if (this.profileForm.value.startDate > this.profileForm.value.endDate ) {
        // start date cannot be greater than end date
        this.dateError = true;
        }
        else if (this.profileForm.value.startDate === this.profileForm.value.endDate &&
        this.startHourInt === this.endHourInt && this.startMinuteInt > this.endMinuteInt) {
          // start time cannot be greater than end time
          this.timingError = true;
        }
        else if (this.profileForm.value.startDate === this.profileForm.value.endDate &&
        this.startHourInt > this.endHourInt) {
        // start time cannot be greater than end time
        this.timingError = true;
        }
        else {
          // put data into an array for the api
          this.putServiceTaskSchedule = {
            title: this.profileForm.value.title,
            start: this.returnedStartDateAndTime,
            end: this.returnedEndDateAndTime,
            userCurrentAssignedId: Number(this.profileForm.value.userName),
            isClosed: this.profileForm.value.isClosed,
            hasTimeLimit: Boolean(this.profileForm.value.hasTimeLimit),
            highPriority: Boolean(this.profileForm.value.highPriority),
            CustomerId: this.profileForm.value.customer
          };
          this.putData(this.taskScheduleData.id, this.putServiceTaskSchedule);
        }
      }
    }
    else {
      // put data into an array for the api without start and end time
      this.putServiceTaskSchedule =
      {
        title: this.profileForm.value.title,
        userCurrentAssignedId: Number(this.profileForm.value.userName),
        isClosed: this.profileForm.value.isClosed,
        hasTimeLimit: Boolean(this.profileForm.value.hasTimeLimit),
        highPriority: Boolean(this.profileForm.value.highPriority),
        CustomerId: this.profileForm.value.customer
      };
      this.putData(this.taskScheduleData.id, this.putServiceTaskSchedule);
    }
  }

  downloadAttachment(attachment) {
    this.attachmentService.downloadAttachment(attachment.taskScheduleId, attachment.fileName);
  }

  deleteAttachment(attachment) {
    if (confirm('Are you sure you want to delete this attachment?')) {
    this.attachmentService.deleteAttachment(attachment).subscribe(next => {
      this.displayTasks();
      }, error => {
        console.log(error);
    });
    }
  }

  putData(id, data) {
    // send data to api
    this.taskScheduleService.putTaskSchedule(id, data).subscribe(next => {
        this.ngOnInit();
        alert('Task has been updated');
        this.dialogRef.close({event: 'Cancel'}); // dialog box close
      }, error => {
        console.log(error);
    });
  }

  deleteTask() {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskScheduleService.deleteTaskSchedule(this.taskScheduleData.id).subscribe(next => {
        this.dialogRef.close({event: 'Cancel'}); // dialog box close
        }, error => {
          alert('unable to delete');
      });
    }
  }
  noteCreation() {
    this.postNote = {
      notesInfo: this.profileForm.value.newNote,
      taskScheduleId: this.taskScheduleData.id
    };
    this.noteService.postNote(this.postNote).subscribe(next => {
      this.ngOnInit();
      // window.location.reload();
      }, error => {
        console.log(error);
    });
  }

  userLastEdit() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.userMemberModels.length; i++) {
      if (this.userMemberModels[i].id === this.taskScheduleData.userLastEditId) {
        this.userNameOfLastEdit = this.userMemberModels[i].username;
      }
    }
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

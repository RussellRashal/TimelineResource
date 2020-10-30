import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Note } from '../_models/note';
import { NoteService } from '../_services/note.service';
import { StateStorageService } from '../_services/stateStorage.service';
import { TaskScheduleService } from '../_services/taskSchedule.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  profileForm: FormGroup;
  notesInfo: FormControl;
  userMemberModels;
  currentUserId;
  selectedName;
  date;
  time;
  currentUserIdLogged;
  sendNote: Note;
  NoteData;

  constructor(
    private stateStorageService: StateStorageService,
    private noteService: NoteService,
    private taskScheduleService: TaskScheduleService
    ) { }

  @Input() note;
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit() {
    this.initForm();
    // console.log(this.note);
    this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    this.currentUserIdLogged = JSON.parse(localStorage.getItem('user'));
    this.currentUserId = this.note.userId;

    // this.NoteData = this.taskScheduleService.getTaskSchedule();


    this.whichUser();
    // console.log(this.userMemberModels);

    this.date = this.note.dateCreated.toString().slice(0, 10);
    this.time = this.note.dateCreated.toString().slice(11, 16);

    this.canUserUpdateAndDelete();

  }

  initForm() {
    // this.profileForm = new FormGroup({
    //   notesInfo: new FormControl(this.note.notesInfo)
    //   });

    this.notesInfo = new FormControl(this.note.notesInfo);

  }

  whichUser() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.userMemberModels.length; i++) {
      if (this.userMemberModels[i].id === this.note.userId) {
        this.selectedName = this.userMemberModels[i].username;
      }
    }
  }

  hours() {
    return this.note.dateCreated.toISOString().slice(0, 10);
  }

  canUserUpdateAndDelete() {
    if (this.currentUserIdLogged.id === this.currentUserId){
      // console.log('this one matches with logged in user');
      return true;
    }
  }

  putNote() {
    this.sendNote = {
      notesInfo: this.notesInfo.value
    };
    this.noteService.putNote(
      this.note.id,
      this.sendNote).subscribe(next => {
        console.log('success');
        this.reload.emit();
      }, error => {
        console.log(error);
      });
  }

  deleteNote() {
    if (confirm('Are you sure you want to delete this task?')) {
      this.noteService.deleteNote(this.note.id).subscribe(next => {
        console.log('success');
        this.reload.emit();
      }, error => {
        console.log(error);
      });
    }
  }
}

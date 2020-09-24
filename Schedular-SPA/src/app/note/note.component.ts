import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StateStorageService } from '../_services/stateStorage.service';

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

  constructor(private stateStorageService: StateStorageService) { }

  @Input() note;


  ngOnInit() {
    this.initForm();
    console.log(this.note);
    this.userMemberModels = this.stateStorageService.getUserMemberStorage();
    this.currentUserIdLogged = JSON.parse(localStorage.getItem('user'));
    this.currentUserId = this.note.userId;


    this.whichUser();

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
        console.log('loop went through');
      }
    }
  }

  hours() {
    return this.note.dateCreated.toISOString().slice(0, 10);
  }

  canUserUpdateAndDelete() {
    if (this.currentUserIdLogged.id === this.currentUserId){
      console.log('this one matches with logged in user');
      return true;
    }
  }


}

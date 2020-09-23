import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  profileForm: FormGroup;

  constructor() { }

  @Input() note;


  ngOnInit() {
    this.initForm();
    console.log(this.note);
  }

  initForm() {
    this.profileForm = new FormGroup({
      notesInfo: new FormControl(this.note.notesInfo),
      dateCreated: new FormControl(this.note.dateCreated),
      userId: new FormControl(this.note.userId)
      });
  }

}

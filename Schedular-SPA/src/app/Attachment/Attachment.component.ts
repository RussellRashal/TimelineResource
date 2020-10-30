import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { TaskScheduleService } from '../_services/taskSchedule.service';
import { StateStorageService } from '../_services/stateStorage.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {
  public uploader: FileUploader;
  hasBaseDropZoneOver = false;
  token;
  matchedFileName;
  taskArray;
  isDataAvailable: boolean;
  attachmentArray;
  attachmentFileNameArray: any[];
  taskId;


  constructor(
    private taskScheduleService: TaskScheduleService,
    private stateStorageService: StateStorageService,
    public dialogRef: MatDialogRef<AttachmentComponent>) {
  }


  ngOnInit() {
    this.isDataAvailable = false;

    // retrieve data from stateStorage from updateTaskComponent
    this.attachmentArray = this.stateStorageService.getAttachmentFileName();
    this.taskId = this.stateStorageService.getTaskId();
    this.isDataAvailable = true;
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  uploadFile() {
    this.uploader.uploadAll();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: environment.apiUrl + 'AttachmentFile/upload/' + this.taskId, // add task id here
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['doc', 'image', 'video', 'pdf', 'xls', 'ppt', 'audio'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 25 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (response) => {
      if (response) {
        alert('File has been successully uploaded');
      }
    };
  }

  closeButton() {
    this.dialogRef.close({event: 'Cancel'});
  }

}

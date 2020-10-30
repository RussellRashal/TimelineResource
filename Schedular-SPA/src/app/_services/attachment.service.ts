import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  baseUrl = environment.apiUrl + 'AttachmentFile/';
  test: any[];

  constructor(private http: HttpClient) { }

  downloadAttachment(taskId, fileName) {
    const blob = new Blob([fileName]);
    const url = this.baseUrl + 'download/' + taskId + '/' + fileName;
    window.open(url);

  }

  // deleteAttachment(download: any) {
  //   this.http.delete(this.baseUrl + 'delete', download);
  // }

  deleteAttachment(attachment): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'delete', attachment);
  }

}

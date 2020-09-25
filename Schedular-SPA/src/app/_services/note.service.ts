import { Note } from './../_models/note';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl = environment.apiUrl + 'Notes';

  constructor(private http: HttpClient) { }

  postNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, note);
  }

  putNote(id: number, note: Note) {
    return this.http.put<Note>(this.baseUrl + '/' + id, note);
  }

  deleteNote(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

}

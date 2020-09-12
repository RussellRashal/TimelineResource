import { UserMemberModel } from '../_models/UserMemberModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserMemberService {
  baseUrl = environment.apiUrl + 'user';

constructor(
  private http: HttpClient,
  ) { }

  // return an array of staff
  getUsers(): Observable<UserMemberModel[]> {
    return this.http.get<UserMemberModel[]>(this.baseUrl);
  }
}

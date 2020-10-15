import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  baseUrl = environment.apiUrl + 'Auth/editName';
  SecondUrl = environment.apiUrl + 'Auth/editRoles';
  PasswordUrl = environment.apiUrl + 'Auth/';

  constructor(
    private http: HttpClient) { }

  editRole(userName, role) {
      return this.http.put(this.SecondUrl + '/' + userName + '/' + role, { },
      { responseType: 'text' });
  }

  putEditName(currentUserName, firstName, LastName) {
    return this.http.put(
      this.baseUrl + '/' + currentUserName + '/' + firstName + '/' + LastName, '',
      { responseType: 'text' });
  }

  editPassword( model: any): Observable<any> {
      return this.http.put<any>(this.PasswordUrl + 'adminPasswordReset' , model );
  }
}

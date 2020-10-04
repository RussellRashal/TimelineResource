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

  constructor(
    private http: HttpClient) { }

  editRole(userName, role) {
      return this.http.put(this.SecondUrl + '/' + userName + '/' + role, { });
  }

  putEditName(currentUserName, firstName, LastName) {
    return this.http.put<string>(
      this.baseUrl + '/' + currentUserName + '/' + firstName + '/' + LastName , {});
  }

}

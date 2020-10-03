import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditNameService {
  baseUrl = environment.apiUrl + 'Auth/editName';
  SecondUrl = environment.apiUrl + 'Auth/editRoles';
constructor(
  private http: HttpClient,
) { }


editRole(userName, role) {
    return this.http.put(this.SecondUrl + '/' + userName + '/' + role, { });
}


puteditName(currentUserName, firstName, LastName) {
  return this.http.put(this.baseUrl + '/' + currentUserName + '/' + firstName + '/' + LastName , { });
  // return taskSchedule;
}

}

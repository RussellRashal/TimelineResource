import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  baseUrl = environment.apiUrl + 'Auth/';


  constructor(
    private http: HttpClient) { }

  editRole(userRole) {
      return this.http.put(this.baseUrl + 'editRoles', userRole, { responseType: 'text' });
  }

  putEditName(userEdit) {
    return this.http.put(this.baseUrl + 'editName', userEdit, { responseType: 'text' });
  }

  editAnyPasswordAdmin(model: any) {
      return this.http.put(this.baseUrl + 'adminPasswordReset' , model );
  }
}

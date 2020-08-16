import { StaffMemberModel } from '../_models/StaffMemberModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StaffMemberService {
  baseUrl = environment.apiUrl + 'Staff';

constructor(
  private http: HttpClient,
  ) { }

  // return an array of staff
  getStaffs(): Observable<StaffMemberModel[]> {
    return this.http.get<StaffMemberModel[]>(this.baseUrl);
  }
}

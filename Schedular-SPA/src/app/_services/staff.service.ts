import { Staff } from './../_models/staff';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StaffService {
  baseUrl = environment.apiUrl + 'Staff';

constructor(private http: HttpClient) { }

  // return an array of staff
  getStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.baseUrl);
  }
}

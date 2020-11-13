import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = environment.apiUrl + 'Customer/';

  constructor(
    private http: HttpClient) { }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getCustomer(id): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + id);
  }

  postCustomer(customer): Observable<any> {
    return this.http.post<any>(this.baseUrl, customer);
  }



}

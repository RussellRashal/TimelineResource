import { CustomerService } from './../_services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Customer',
  templateUrl: './Customer.component.html',
  styleUrls: ['./Customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers;

  constructor(
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      console.log(this.customers);
    }, error => {
      console.log(error);
    });
  }
}

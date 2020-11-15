import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerService } from 'src/app/_services/customer.service';
import { EditCustomerComponent } from '../editCustomer/editCustomer.component';
import { StateStorageService } from 'src/app/_services/stateStorage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from '../AddCustomer/AddCustomer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './Customer.component.html',
  styleUrls: ['./Customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers;
  customerType: string = environment.customerType;
  profileForm;



  constructor(
    private customerService: CustomerService,
    private stateStorageService: StateStorageService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      console.log(this.customers);
    }, error => {
      console.log(error);
    });
  }

  editCustomer(customer) {
    this.stateStorageService.setCustomerId(customer);

    const dialogRef = this.dialog.open(EditCustomerComponent, {
      width: '70%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      width: '70%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteCustomer(CustomerId) {
    if (confirm('Are you sure you want to delete?')) {
      this.customerService.deleteCustomer(CustomerId).subscribe(next => {
        console.log('success');
        this.ngOnInit();
      }, error => {
        console.log(error);
      });
    }
  }
}

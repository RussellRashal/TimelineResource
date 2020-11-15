import { environment } from './../../../environments/environment.prod';
import { CustomerService } from './../../_services/customer.service';
import { Component, OnInit } from '@angular/core';
import { StateStorageService } from 'src/app/_services/stateStorage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editCustomer.component.html',
  styleUrls: ['./editCustomer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer;
  profileForm;
  customerType: string = environment.customerType;
  customerUpdate;


  constructor(
    private customerService: CustomerService,
    private stateStorageService: StateStorageService,
    public dialogRef: MatDialogRef<EditCustomerComponent>
  ) { }

  ngOnInit() {
    this.customer = this.stateStorageService.getCustomerId();
    console.log('below');
    console.log(this.customer);
    this.initForm();
  }

  UpdateUser() {
    this.customerUpdate = {
      Name: this.profileForm.value.customerName,
      Address: this.profileForm.value.customerAddress,
      AdditionalInfo: this.profileForm.value.customerAdditionalInfo
    };

    this.customerService.putCustomer(this.customer.id, this.customerUpdate).subscribe(next => {
        alert('update sucessful');
        this.dialogRef.close({event: 'Cancel'});
    }, error => {
        console.log(error);
    });
  }

  initForm() {
    this.profileForm = new FormGroup({
      customerName: new FormControl(this.customer.name),
      customerAddress: new FormControl(this.customer.address),
      customerAdditionalInfo: new FormControl(this.customer.additionalInfo)
    });
  }

  closeButton() {
    this.dialogRef.close({event: 'Cancel'});
  }
}

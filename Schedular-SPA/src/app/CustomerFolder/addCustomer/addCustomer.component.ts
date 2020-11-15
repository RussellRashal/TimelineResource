import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/_services/customer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addCustomer.component.html',
  styleUrls: ['./addCustomer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerAdd;
  profileForm;
  customerType: string = environment.customerType;


  constructor(
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<AddCustomerComponent>
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.profileForm = new FormGroup({
      customerName: new FormControl(''),
      customerAddress: new FormControl(''),
      customerAdditionalInfo: new FormControl('')
    });
  }


  addUser() {
    this.customerAdd = {
      Name: this.profileForm.value.customerName,
      Address: this.profileForm.value.customerAddress,
      AdditionalInfo: this.profileForm.value.customerAdditionalInfo
    };

    console.log(this.customerAdd);

    this.customerService.postCustomer(this.customerAdd).subscribe(next => {
        alert(this.customerType + ' added');
        this.dialogRef.close({event: 'Cancel'});
    }, error => {
        console.log(error);
    });
  }

  closeButton() {
    this.dialogRef.close({event: 'Cancel'});
  }

}

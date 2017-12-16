import { CustomerService } from './../customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  msgs: any = [];
  customerForm: FormGroup;
  showMiddle: boolean = true;
  // isDisabled = false; 
  constructor(private fb: FormBuilder, private customerService: CustomerService, public router: Router) { }

  ngOnInit(): void {
    this.getCustomer();   
  }

  getCustomer() {
    this.customerService.getCustomer().subscribe(data => {
      this.handleSuccess(data, this);
    }, err => this.handleError(err, this))
  }



  update(): void {
    this.customerService.update(this.customerForm.value).subscribe(data => {
      this.handleSuccess(data, this);
      this.router.navigate(['/customer']);
    }, err => this.handleError(err, this));
  }


  handleSuccess(data, that) {


    that.customerForm = that.fb.group({
      firstName: [data.name.first, [Validators.required, Validators.minLength(3)]],
      middleName: data.name.middle,
      lastName: [data.name.last, [Validators.required]],
      preferredName: data.name.preferred,
      email: [data.email, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
      phone: [data.mobile.number, [Validators.required, Validators.minLength(10)]],
      countryCode: [data.mobile.country_code, [Validators.required, Validators.minLength(2)]],
      gender: '',
      title: '',
      nationality: ''
    });

    console.log('success')
    let message = data.message;
    that.msgs.push({ severity: 'success', summary: 'valid', detail: message });
  }

  handleError(err, that) {
    let message = err.error.message;
    that.msgs.push({ severity: 'error', summary: 'invalid', detail: message });
  }





}










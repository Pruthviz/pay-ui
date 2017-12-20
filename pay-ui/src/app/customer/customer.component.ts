import { CustomerService } from './customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import { Router, ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: any={};
  msgs: any = [];
  walletBalance;
  amount;
  constructor(public router: Router, private customerService: CustomerService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getCustomer();
    this.getBalance();
  }



  getCustomer() {
    this.customerService.getCustomer().subscribe(data => {
      this.handleSuccess(data, this);
    }, err => this.handleError(err, this))
  }


  getBalance() { 
    this.customerService.getBalance().subscribe(data => {
      this.walletBalance = data.funds.available.amount;
    }, err => this.handleError(err, this))

  }
  


  handleSuccess(data, that) {
    this.customer = {};
    this.customer.firstName = data.name.first;
    this.customer.middleName = data.name.middle;
    this.customer.title = data.title;
    this.customer.gender = data.gender;
    this.customer.nationality = data.nationality;
    this.customer.lastName = data.name.last;
    this.customer.preferredName = data.name.preferred;
    this.customer.email = data.email;
    this.customer.mobile = data.mobile.number;
    this.customer.countryCode = data.mobile.country_code;
  }

  editCustomer() { 
    this.router.navigateByUrl("/editcustomer");
  }

  handleError(err, that) {
    let message = err.error.message;
    that.msgs.push({ severity: 'error', summary: 'invalid', detail: message });
  }



  
}








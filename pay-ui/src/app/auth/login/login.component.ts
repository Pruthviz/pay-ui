import { CustomerService } from './../../customer/customer.service';
import { AuthService } from './../auth.service';
import { Customer } from './../../models/customer';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loginParam = new EventEmitter();

  msgs: any = [];
  loginForm: FormGroup;
  customer: any = {};


  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      this.handleSuccess(data, this);
    }, err => this.handleError(err, this))
  }


  handleSuccess(data, that) {
    if (data.password) {
      if (data.password[0] === "The password format is invalid.") {
        that.loginParam.emit(false);
        that.msgs.push({ severity: 'error', summary: 'Invalid Credentials', detail: "" });
      }
    }
    else {
      sessionStorage.setItem('token', data.access_token);
      


      that.customerService.getCustomer().subscribe(data => {
        this.customer.firstName = data.name.first;
        this.customer.middleName = data.name.middle;
        this.customer.lastName = data.name.last;
        this.customer.preferredName = data.name.preferred;
        this.customer.email = data.email;
        this.customer.mobile = data.mobile.number;
        this.customer.countryCode = data.mobile.country_Code;
        sessionStorage.setItem('customerEmail', data.email);
        if (data.name.preferred) {
          sessionStorage.setItem('loginUser', data.name.preferred);
          that.loginParam.emit({ isLoggedIn: true, loginUser: data.name.preferred });
          that.router.navigate(['/customer']);
        }
        else { 
          sessionStorage.setItem('loginUser', data.name.first + " " + data.name.last);
          that.loginParam.emit({ isLoggedIn: true, loginUser: data.name.first + " " + data.name.last});
          that.router.navigate(['/customer']);
        }
        
      }, err => this.handleError(err, this))



      
    }
  }

  handleError(err, that) {
    that.loginParam.emit(false);
    that.msgs.push({ severity: 'error', summary: 'Invalid Credentials', detail: "" });
  }

}








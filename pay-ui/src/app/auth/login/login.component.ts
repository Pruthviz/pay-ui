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

  msgs: any=[];
  loginForm: FormGroup;
  customer: Customer = new Customer();


  constructor(private fb: FormBuilder, private authService: AuthService,public router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
      password: ['', [Validators.required]]
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
        return false;
      }
    }
      else { 
        sessionStorage.setItem('token', data.access_token);
        // sessionStorage.setItem('LoginUser', data.name.preferred);
      that.loginParam.emit(true);
        this.router.navigateByUrl('/customer');
      }
  }

  handleError(err, that) {
    that.loginParam.emit(false);
    that.msgs.push({ severity: 'error', summary: 'Invalid Credentials', detail: "" });
  }

}








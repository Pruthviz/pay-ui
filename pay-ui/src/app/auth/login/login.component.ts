import { AuthService } from './../auth.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  login(): void {
    console.log('Saved: ' + JSON.stringify(this.loginForm.value));
    this.authService.login(this.loginForm.value).subscribe(data => {
      console.log(data.token);
      this.handleSuccess(data, this);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      this.router.navigate(['/home']);
    }, err => this.handleError(err, this))
  }


  handleSuccess(data, that) {
    
    if (data.password[0] === "The password format is invalid.") { 
      that.msgs.push({ severity: 'error', summary: 'invalid', detail: "The password format is invalid." });
    }

    let message = data.message;
    that.msgs.push({ severity: 'success', summary: 'valid', detail: message });
  }

  handleError(err, that) {
    that.msgs.push({ severity: 'error', summary: 'Invalid Credentials', detail: "" });
  }

}








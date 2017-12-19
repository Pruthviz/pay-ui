import { AuthService } from './../auth.service';
import { Customer } from './../../models/customer';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';





function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  let passwordControl = c.get('password');
  let confirmControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  msgs: any=[];
  customerForm: FormGroup;
  customer: Customer = new Customer();
  passwordMessage: string;
  showMiddle: boolean = false;

  

  private validationMessages = {
    required: 'Please enter your password.',
    pattern: 'please enter a valid password'
  };

  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      }, { validator: passwordMatcher }),
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      middleName: '',
      lastName: ['', [Validators.required]],
      preferredName: '',
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      countryCode: ['', [Validators.required, Validators.minLength(2)]],

    });

    const passwordControl = this.customerForm.get('passwordGroup.password');
    passwordControl.valueChanges.debounceTime(1000).subscribe(value =>
      this.setMessage(passwordControl));
  }





  save(): void {
    
    this.authService.register(this.customerForm.value).subscribe(data => {
      console.log(data.token);
      this.handleSuccess(data, this);
      sessionStorage.setItem('token', data.access_token);
      this.router.navigate(['/customer']);
    }, err => this.handleError(err, this));
  }


  handleSuccess(data, that) {
    console.log('success')
    let message = data.message;
    that.router.navigate(['/customer']);
  }

  handleError(err, that) {
    if (err.error.text.match("HTTP(.*);")) {
      let message = err.error.text.match("HTTP(.*);")[0].substr(13).replace(";", "");
      that.msgs.push({ severity: 'error', summary: message, detail: "" });
    }
    else { 
      let message = err.error.text.match("HTTP(.*)`")[0].substr(13).replace("`", "");
      that.msgs.push({ severity: 'error', summary: message, detail: "" });
    }

  }


  setMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' ');
    }
  }


}








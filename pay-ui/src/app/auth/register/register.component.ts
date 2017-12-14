import { Customer } from './../../models/customer';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';



function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}



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

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    };
    return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer = new Customer();
  passwordMessage: string;
  showMiddle: boolean = false;

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  private validationMessages = {
    required: 'Please enter your password.',
    pattern: 'please enter a valid password'
  };

  constructor(private fb: FormBuilder) { }

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
      phone: ['', [Validators.required,Validators.minLength(10)]],
      countryCode: ['', [Validators.required, Validators.minLength(2)]],
     
    });

    const passwordControl = this.customerForm.get('passwordGroup.password');
    passwordControl.valueChanges.debounceTime(1000).subscribe(value =>
      this.setMessage(passwordControl));
  }

 
  

 
  save(): void {
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' ');
    }
  }

 
}








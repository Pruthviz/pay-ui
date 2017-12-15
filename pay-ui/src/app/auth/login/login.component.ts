import { AuthService } from './../auth.service';
import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msgs: any=[];
  loginForm: FormGroup;
  customer: Customer = new Customer();


  constructor(private fb: FormBuilder,private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    console.log('Saved: ' + JSON.stringify(this.loginForm.value));
    this.authService.login(this.loginForm.value).subscribe(response => {
      this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
      console.log(response);
    }); 
  }

}








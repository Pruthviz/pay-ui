import { Router } from '@angular/router';
import { PaymentService } from './payment.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  display: boolean = false;
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private paymentService:PaymentService,private router:Router) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]],
      cardName: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }


  showDialog() {
    this.display = true;
  }
  gotoProfile() { 
    this.router.navigateByUrl("/customer");
  }

  pay() { 
    this.paymentService.payAmount("").subscribe(data => {
      this.handleSuccess(data, this);
    }, err => this.handleError(err, this));
  }


  handleSuccess(data, that) {

    that.paymentService.payAmount("").subscribe(data => {
      that.handleStatusSuccess(data, that);
    }, err => that.handleStatusError(err, that));


   
  }

  handleStatusSuccess(data, tht) { 
    tht.showDialog();

  }

  handleStatusError(err, tht) { 
    tht.msgs.push({ severity: 'error', summary: 'Error', detail: "" });
  }




  handleError(err, that) {
    let message = err.error.message;
    that.msgs.push({ severity: 'error', summary: 'invalid', detail: message });
  }


}

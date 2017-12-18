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

  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private PaymentService:PaymentService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]],
      cardName: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  pay() { 

    this.PaymentService.payAmount("").subscribe(data => {
      this.handleSuccess(data, this);
     
    }, err => this.handleError(err, this));
  }


  handleSuccess(data, that) {
    debugger;
    // console.log('success')
    // let message = data.message;
    that.msgs.push({ severity: 'success', summary: 'valid', detail: "message" });
  }

  handleError(err, that) {
    debugger;
    let message = err.error.message;
    that.msgs.push({ severity: 'error', summary: 'invalid', detail: message });
  }


}

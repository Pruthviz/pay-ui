import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from './payment.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  display: boolean = false;
  formGroup: FormGroup;
  amount: any;

  msgs: Message[] = [];
  constructor(private fb: FormBuilder, private paymentService:PaymentService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]],
      cardName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      amount: ['', Validators.compose([Validators.required])]
    });
  }


  showDialog() {
    this.display = true;
  }
  gotoProfile() { 
    this.router.navigateByUrl("/customer");
  }

  pay() { 
    this.paymentService.payAmount(this.formGroup.value).subscribe(data => {
      this.handleSuccess(data, this);
    }, err => this.handleError(err, this));
  }


  handleSuccess(data, that) {

    that.paymentService.statusCall(data.id).subscribe(data => {
      that.handleStatusSuccess(data, that);
    }, err => that.handleStatusError(err, that));


   
  }

  handleStatusSuccess(data, tht) { 

    tht.paymentService.paymentCall(tht.amount).subscribe(data => {
      tht.handlePaymentSuccess(data, tht);
    }, err => tht.handlePaymentError(err, tht));
  }

  handleStatusError(err, tht) { 
    let message = err.error.text.match("HTTP(.*);")[0].substr(13).replace(";", "");
    tht.msgs.push({ severity: 'error', summary: message, detail: "" });
  }



  handlePaymentSuccess(data, tht2) {
    tht2.showDialog();
  }

  handlePaymentError(err, tht2) {
    let message = err.error.text.match("HTTP(.*);")[0].substr(13).replace(";", "");
    tht2.msgs.push({ severity: 'error', summary: message, detail: "" });
  }




  handleError(err, that) {
    let message = err.error.message;
    that.msgs.push({ severity: 'error', summary: message, detail: "" });
  }


}

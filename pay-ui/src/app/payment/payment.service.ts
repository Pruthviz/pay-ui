import { Customer } from './../models/customer';
import { AppSettings } from './../app.settings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";

@Injectable()
export class PaymentService {
    constructor(private httpClient: HttpClient) { }

    getCustomer() {
        return this.httpClient.get(AppSettings.ApiEndPoint + "/users?access_token=" + sessionStorage.token).catch((error: Response) => {
            return Observable.throw(error);
        });
    }

    getBalance() {
        return this.httpClient.post(AppSettings.ApiEndPoint + "/callback?access_token=" + sessionStorage.token, "").catch((error: Response) => {
            return Observable.throw(error);
        });
    }

    payAmount(formData) {

    let month = formData.expirationDate.split('/')[0].trim();
    let year = formData.expirationDate.split('/')[1].trim();
        let data = {
            'amount': formData.amount, 
            'ccExpiryMonth' : Number(month),
            'ccExpiryYear' :Number(year),
            'cvvNumber': formData.cvc,
            "card_no":formData.creditCard
        }

        return this.httpClient.post(AppSettings.ApiEndPoint + "/stripe?access_token=" + sessionStorage.token, data).catch((error: Response) => {
            return Observable.throw(error);
        });
    }
    statusCall(id) { 
        let data = {
            'id': id
        }
        return this.httpClient.post(AppSettings.ApiEndPoint + "/status?access_token=" + sessionStorage.token, data).catch((error: Response) => {
            return Observable.throw(error);
        });

    }


    paymentCall(amount) {debugger
        let data = {
            'amount': amount,
            'email':sessionStorage.customerEmail
        }
        return this.httpClient.post(AppSettings.ApiEndPoint + "/payment?access_token=" + sessionStorage.token, data).catch((error: Response) => {
            return Observable.throw(error);
        });

    }

}
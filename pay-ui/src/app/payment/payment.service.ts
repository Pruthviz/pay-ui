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
            return Observable.throw(error.json());
        });
    }

    getBalance() {
        return this.httpClient.post(AppSettings.ApiEndPoint + "/callback?access_token=" + sessionStorage.token, "").catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }

    payAmount(formData) {

        let data = {
            'amount': 100,
           
            'ccExpiryMonth' : 11,
            'ccExpiryYear' :2020,
            'cvvNumber': 232,
            "card_no":"4242424242424242"
        }

        return this.httpClient.post(AppSettings.ApiEndPoint + "/stripe?access_token=" + sessionStorage.token, data).catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }


}
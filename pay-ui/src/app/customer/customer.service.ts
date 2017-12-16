import { AppSettings } from './../app.settings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";

@Injectable()
export class CustomerService {
    constructor(private httpClient: HttpClient) { }

    getCustomer() {
        return this.httpClient.get(AppSettings.ApiEndPoint + "/users?access_token="+sessionStorage.token).catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }

    update(formData) { 

        let data = {
            title: formData.title,
            middle_name: formData.middleName,
            nationality: formData.nationality,
            gender: formData.gender,
            access_token:sessionStorage.token
        }

        return this.httpClient.put(AppSettings.ApiEndPoint + "/users", data).catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }


}
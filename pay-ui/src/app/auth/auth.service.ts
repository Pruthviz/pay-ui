import { AppSettings } from './../app.settings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  register(formData) {

    let data =
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        preferred_name: formData.preferredName,
        email: formData.email,
        password: formData.passwordGroup.password,
        mobile_country_code: formData.countryCode,
        mobile: formData.phone,
        device_signature: 'device_signature',
      }

    return this.httpClient.post(AppSettings.ApiEndPoint + "/users", data);



  }


  login(formData) {

    let data =
      {
        grant_type: 'client_credentials',
        email: formData.email,
        password: formData.password,
        device_signature: 'device_signature'
      }
    return this.httpClient.post(AppSettings.ApiEndPoint + "/auth", data);
  }


}
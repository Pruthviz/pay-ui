import { PaymentService } from './payment/payment.service';
import { CustomerService } from './customer/customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { CustomerComponent } from './customer/customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { PaymentComponent } from './payment/payment.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { DialogModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CustomerComponent,
    EditCustomerComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule,
    CreditCardDirectivesModule,
    DialogModule
  ],
  providers: [AuthService, CustomerService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

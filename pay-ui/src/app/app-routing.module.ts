import { CanActivateViaAuthGuard } from './auth/auth.guard';
import { PaymentComponent } from './payment/payment.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: "register", component: RegisterComponent },
  {
    path: "customer", component: CustomerComponent, canActivate: [
      CanActivateViaAuthGuard
    ] },
  {
    path: "editcustomer", component: EditCustomerComponent, canActivate: [
      CanActivateViaAuthGuard
    ] },
  {
    path: "payment/:amount", component: PaymentComponent, canActivate: [
      CanActivateViaAuthGuard
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

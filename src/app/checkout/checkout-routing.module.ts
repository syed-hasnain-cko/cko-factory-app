import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { CheckoutProductFunctionTabsComponent } from './components/checkout-product-function-tabs/checkout-product-function-tabs.component';

import { ResponseComponent } from './components/response/response.component';


const checkoutRoutes: Routes = [
  { path: '', component:CheckoutProductFunctionTabsComponent},
  { path: 'success/:cko-session-id', component:ResponseComponent},
  { path: 'failure', component:ResponseComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(checkoutRoutes)
  ]
})
export class CheckoutRoutingModule { }
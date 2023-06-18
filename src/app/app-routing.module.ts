import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutRoutingModule } from './checkout/checkout-routing.module';





const appRoutes: Routes = [

  { path: '', loadChildren: () => import('../app/checkout/checkout.module').then(m => m.CheckoutModule)}
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash:false})],
  exports: []
})
export class AppRoutingModule { }
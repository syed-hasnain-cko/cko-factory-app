import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { ResponseComponent } from './components/response/response.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { FrameComponent } from './components/frame/frame.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CheckoutSummaryComponent,
    CheckoutFormComponent,
    ResponseComponent,
    CheckoutPageComponent,
    FrameComponent,
  ],
  imports: [
    HttpClientModule,
    CheckoutRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class CheckoutModule { }

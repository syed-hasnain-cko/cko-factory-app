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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutProductFunctionTabsComponent } from './components/checkout-product-function-tabs/checkout-product-function-tabs.component';
import { CheckoutSingleFunctionTabComponent } from './components/checkout-single-function-tab/checkout-single-function-tab.component';
import { CheckoutSwitchingFunctionsTabComponent } from './components/checkout-switching-functions-tab/checkout-switching-functions-tab.component';
import { CheckoutSandboxConfigurationComponent } from './components/checkout-sandbox-configuration/checkout-sandbox-configuration.component';
import { AlertModule } from '../_alert';
import { SofortSourceComponent } from './components/sofort-source/sofort-source.component';
import { IdealSourceComponent } from './components/ideal-source/ideal-source.component';
import { P24SourceComponent } from './components/p24-source/p24-source.component';




@NgModule({
  declarations: [
    CheckoutSummaryComponent,
    CheckoutFormComponent,
    ResponseComponent,
    CheckoutPageComponent,
    FrameComponent,
    CheckoutProductFunctionTabsComponent,
    CheckoutSingleFunctionTabComponent,
    CheckoutSwitchingFunctionsTabComponent,
    CheckoutSandboxConfigurationComponent,
    SofortSourceComponent,
    IdealSourceComponent,
    P24SourceComponent,
  ],
  imports: [
    HttpClientModule,
    CheckoutRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AlertModule,
    FormsModule
  ],
  providers: [],
})
export class CheckoutModule { }

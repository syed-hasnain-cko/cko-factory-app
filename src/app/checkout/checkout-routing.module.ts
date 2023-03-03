import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';

import { ResponseComponent } from './components/response/response.component';


const checkoutRoutes: Routes = [
  { path: '', component:CheckoutPageComponent},
  { path: 'success', component:ResponseComponent},
  { path: 'failure', component:ResponseComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(checkoutRoutes )
  ]
})
export class CheckoutRoutingModule { }
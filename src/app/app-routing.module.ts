import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';





const appRoutes: Routes = [

  { path: '', loadChildren: () => import('../app/checkout/checkout.module').then(m => m.CheckoutModule)}

  ,
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: []
})
export class AppRoutingModule { }
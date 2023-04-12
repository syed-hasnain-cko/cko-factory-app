import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-single-function-tab',
  templateUrl: './checkout-single-function-tab.component.html',
  styleUrls: ['./checkout-single-function-tab.component.css']
})
export class CheckoutSingleFunctionTabComponent {
  @Input('tabTitle') title: string = '';
  @Input() active = false;
}

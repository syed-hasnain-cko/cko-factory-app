import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-qpay-source',
  templateUrl: './qpay-source.component.html',
  styleUrls: ['./qpay-source.component.css']
})
export class QpaySourceComponent {
  @Input() qpay : any;
}

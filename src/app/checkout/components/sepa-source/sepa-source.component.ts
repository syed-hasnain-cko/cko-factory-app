import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sepa-source',
  templateUrl: './sepa-source.component.html',
  styleUrls: ['./sepa-source.component.css']
})
export class SepaSourceComponent {
  @Input() sepa : any;
}

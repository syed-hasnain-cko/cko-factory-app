import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ideal-source',
  templateUrl: './ideal-source.component.html',
  styleUrls: ['./ideal-source.component.css']
})
export class IdealSourceComponent {
  @Input() ideal : any;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-knet-source',
  templateUrl: './knet-source.component.html',
  styleUrls: ['./knet-source.component.css']
})
export class KnetSourceComponent {
  @Input() knet : any;
}

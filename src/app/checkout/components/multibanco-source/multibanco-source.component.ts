import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multibanco-source',
  templateUrl: './multibanco-source.component.html',
  styleUrls: ['./multibanco-source.component.css']
})
export class MultibancoSourceComponent {
  @Input() multibanco : any;
}
